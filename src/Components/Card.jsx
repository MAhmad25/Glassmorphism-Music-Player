/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useContext, useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";
import { PlayingMusic } from "../Contexts/Context";

function WaveShader({ imageUrl }) {
      const meshRef = useRef();
      const texture = useLoader(TextureLoader, imageUrl || "/images/supplication.jpg");
      const { width, height } = texture.image;
      const aspectRatio = width / height;

      const uniforms = useRef({
            uTime: { value: 0 },
            uAmplitude: { value: 0.3 },
            uWaveLength: { value: 20.0 },
            uTexture: { value: texture },
            vUvScale: { value: new THREE.Vector2(1, aspectRatio) },
      });

      const material = useMemo(() => {
            return new THREE.ShaderMaterial({
                  uniforms: uniforms.current,
                  vertexShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uAmplitude;
        uniform float uWaveLength;
        
        void main() {
          vUv = uv;
          vec3 newPosition = position;
          
          // Create vertical wave effect (using position.y instead of position.x)
          float wave = uAmplitude * sin(position.y * uWaveLength + uTime);
          newPosition.z = position.z + wave; 
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
                  fragmentShader: `
        uniform sampler2D uTexture;
        uniform vec2 vUvScale;
        varying vec2 vUv;
        
        void main() {
          // Scale UV coordinates to maintain aspect ratio
          vec2 uv = (vUv - 0.5) * vUvScale + 0.5;
          vec4 color = texture2D(uTexture, uv);
          gl_FragColor = color;  
        }
      `,
                  transparent: true,
                  side: THREE.DoubleSide,
            });
      }, []);

      useFrame(() => {
            if (meshRef.current && meshRef.current.material.uniforms) {
                  meshRef.current.material.uniforms.uTime.value += 0.06;
                  const scaleRatio = 1;
                  meshRef.current.material.uniforms.vUvScale.value.set(1, aspectRatio / scaleRatio);
            }
      });

      useMemo(() => {
            if (uniforms.current.uTexture && texture) {
                  uniforms.current.uTexture.value = texture;
                  uniforms.current.uTexture.value.needsUpdate = true;
            }
      }, [texture]);

      return (
            <mesh ref={meshRef} material={material} scale={[2, 2, 1]}>
                  {/* Higher subdivision for smoother waves */}
                  <planeGeometry args={[1, 1, 32, 32]} />
            </mesh>
      );
}

// Scene component
function WaveScene({ imageUrl }) {
      return (
            <>
                  {/* Lighting */}
                  <ambientLight intensity={0.8} />
                  <directionalLight position={[10, 10, 5]} intensity={0.5} />

                  {/* Wave shader plane */}
                  <WaveShader imageUrl={imageUrl} />
            </>
      );
}

const Card = () => {
      const { playingMusicInfo } = useContext(PlayingMusic);
      return (
            <div className="h-72 sm:h-64 lg:h-80 w-72 lg:w-80 absolute left-1/2 xl:left-[60%] lg:left-[55%] rounded-full -translate-y-1/2 -translate-x-1/2 top-1/2 sm:top-[54%]">
                  <div className="absolute inset-0 rounded-full">
                        <Canvas
                              camera={{
                                    position: [0, 0, 1],
                                    fov: 75,
                                    near: 0.1,
                                    far: 1000,
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
                              <WaveScene imageUrl={playingMusicInfo?.image} />
                        </Canvas>
                  </div>
            </div>
      );
};

export default Card;
