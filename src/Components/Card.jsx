/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useContext, useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";
import { PlayingMusic } from "../Contexts/Context";

// Pixelated transition shader component
function PixelTransitionShader({ imageUrl, prevImageUrl }) {
      const meshRef = useRef();
      const progressRef = useRef(1);
      const isTransitioningRef = useRef(false);

      // Load current and previous textures
      const texture = useLoader(TextureLoader, imageUrl || "/images/supplication.jpg");
      const prevTexture = useLoader(TextureLoader, prevImageUrl || imageUrl || "/images/supplication.jpg");

      // Pixel values for the effect
      const PIXELS = useMemo(() => new Float32Array([1, 1.5, 2, 2.5, 3, 1, 1.5, 2, 2.5, 3, 3.5, 4, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 20, 100].map((v) => v / 100)), []);

      // Create shader material
      const material = useMemo(() => {
            return new THREE.ShaderMaterial({
                  uniforms: {
                        uTime: { value: 0 },
                        uFillColor: { value: new THREE.Color("#9e9e9e") },
                        uProgress: { value: 1 },
                        uType: { value: 3 },
                        uPixels: { value: PIXELS },
                        uTextureSize: { value: new THREE.Vector2(1, 1) },
                        uElementSize: { value: new THREE.Vector2(1, 1) },
                        uTexture: { value: texture },
                        uPrevTexture: { value: prevTexture },
                  },
                  vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
                  fragmentShader: `
        uniform float uTime;
        uniform vec3 uFillColor;
        uniform float uProgress;
        uniform float uType;
        uniform float uPixels[36];
        uniform vec2 uTextureSize;
        uniform vec2 uElementSize;
        uniform sampler2D uTexture;
        uniform sampler2D uPrevTexture;
        varying vec2 vUv;

        vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
        vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
        vec3 fade3(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

        float mapf(float value, float min1, float max1, float min2, float max2) {
          float val = min2 + (value - min1) * (max2 - min2) / (max1 - min1);
          return clamp(val, min2, max2);
        }

        float quadraticInOut(float t) {
          float p = 2.0 * t * t;
          return t < 0.5 ? p : -p + (4.0 * t) - 1.0;
        }

        void main() {
          vec2 uv = vUv - vec2(0.5);
          float aspect1 = uTextureSize.x/uTextureSize.y;
          float aspect2 = uElementSize.x/uElementSize.y;
          if(aspect1>aspect2){uv *= vec2( aspect2/aspect1,1.);} 
          else{uv *= vec2( 1.,aspect1/aspect2);}
          uv += vec2(0.5);

          // Sample both textures
          vec4 currentColor = texture2D(uTexture, uv);
          vec4 prevColor = texture2D(uPrevTexture, uv);

          if(uType==3.0){
            float progress = quadraticInOut(1.0-uProgress);
            float s = 50.0;
            float imageAspect = uTextureSize.x/uTextureSize.y;
            vec2 gridSize = vec2(s, floor(s/imageAspect));

            float v = smoothstep(0.0, 1.0, vUv.y + sin(vUv.x*4.0+progress*6.0) * mix(0.3, 0.1, abs(0.5-vUv.x)) * 0.5 * smoothstep(0.0, 0.2, progress) + (1.0 - progress * 2.0));
            float mixnewUV = (vUv.x * 3.0 + (1.0-v) * 50.0)*progress;
            vec2 subUv = mix(uv, floor(uv * gridSize) / gridSize, mixnewUV);

            // Mix between previous and current texture based on progress
            vec4 transitionColor = mix(prevColor, currentColor, step(0.1, uProgress));
            vec4 color = texture2D(uTexture, subUv);
            
            // Apply transition effect
            if (uProgress < 1.0) {
              color = mix(transitionColor, color, v);
            }

            color.a = mix(1.0, pow(v, 5.0), step(0.0, progress));
            color.a = pow(v, 1.0);
            color.rgb = mix(color.rgb, uFillColor, smoothstep(0.5, 0.0, abs(0.5-color.a)) * progress);
            gl_FragColor = color;
          } else {
            gl_FragColor = currentColor;
          }
          
          gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(1.0/1.2));
        }
      `,
                  transparent: true,
                  side: THREE.DoubleSide,
            });
      }, [texture, prevTexture, PIXELS]);

      // Update uniforms when texture changes
      useEffect(() => {
            if (material.uniforms && texture) {
                  material.uniforms.uTextureSize.value.set(texture.image.width, texture.image.height);
                  material.uniforms.uElementSize.value.set(1, 1);
            }
      }, [material, texture]);

      // Animation loop
      useFrame(() => {
            if (meshRef.current && meshRef.current.material.uniforms) {
                  const uniforms = meshRef.current.material.uniforms;

                  // Update time
                  uniforms.uTime.value += 0.016;

                  // Handle transition animation
                  if (isTransitioningRef.current) {
                        // Fast initial transition, then slower
                        const currentProgress = progressRef.current;
                        let speed;

                        if (currentProgress < 0.3) {
                              speed = 0.05; // Fast initial phase (0-30%)
                        } else if (currentProgress < 0.7) {
                              speed = 0.0195; // Medium speed (30-70%)
                        } else {
                              speed = 0.015; // Slower finish (70-100%)
                        }

                        progressRef.current += speed;

                        // Switch texture at 10% progress
                        if (progressRef.current > 0.1 && uniforms.uTexture.value !== texture) {
                              uniforms.uTexture.value = texture;
                              uniforms.uTextureSize.value.set(texture.image.width, texture.image.height);
                        }

                        // Complete transition
                        if (progressRef.current >= 1) {
                              progressRef.current = 1;
                              isTransitioningRef.current = false;
                        }

                        uniforms.uProgress.value = progressRef.current;
                  }
            }
      });

      // Trigger transition when image changes
      useEffect(() => {
            if (imageUrl !== prevImageUrl) {
                  progressRef.current = 0;
                  isTransitioningRef.current = true;

                  if (material.uniforms) {
                        material.uniforms.uPrevTexture.value = prevTexture;
                        material.uniforms.uProgress.value = 0;
                  }
            }
      }, [imageUrl, prevImageUrl, material, prevTexture]);

      return (
            <mesh ref={meshRef} material={material} scale={[5.5, 5.5, 1]}>
                  <planeGeometry args={[1, 1, 1, 1]} />
            </mesh>
      );
}

// Scene component
function PixelScene({ imageUrl, prevImageUrl }) {
      return (
            <>
                  <ambientLight intensity={20} />
                  <directionalLight position={[10, 10, 10]} intensity={20} />
                  <PixelTransitionShader imageUrl={imageUrl} prevImageUrl={prevImageUrl} />
            </>
      );
}

// Main component
const Card = () => {
      const { playingMusicInfo } = useContext(PlayingMusic);
      const [prevImage, setPrevImage] = useState(playingMusicInfo?.image || null);
      const [currentImage, setCurrentImage] = useState(playingMusicInfo?.image || null);

      // Better image change detection
      useEffect(() => {
            if (playingMusicInfo?.image && playingMusicInfo.image !== currentImage) {
                  setPrevImage(currentImage); // Set current as previous
                  setCurrentImage(playingMusicInfo.image); // Update to new image
            }
      }, [playingMusicInfo?.image, currentImage]);
      return (
            <div className="w-72 h-72 sm:w-64 sm:h-64 lg:w-80 lg:h-80 xl:left-[60%] lg:left-[55%] absolute left-1/2 rounded-full -translate-y-1/2 -translate-x-1/2 top-1/2 sm:top-[54%] overflow-hidden">
                  {/* Three.js Canvas with pixel transition effect */}
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                        <Canvas
                              camera={{
                                    position: [0, 0, 3],
                                    fov: 75,
                                    near: 0.1,
                                    far: 100,
                              }}
                              gl={{
                                    alpha: true,
                                    antialias: true,
                                    preserveDrawingBuffer: false,
                              }}
                              style={{
                                    background: "transparent",
                                    borderRadius: "50%",
                              }}
                        >
                              <PixelScene imageUrl={currentImage} prevImageUrl={prevImage} />
                        </Canvas>
                  </div>
            </div>
      );
};

export default Card;
