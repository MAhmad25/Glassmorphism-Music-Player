/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useContext, useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";
import { PlayingMusic } from "../Contexts/Context";

function WaterShader({ imageUrl }) {
      const meshRef = useRef();
      const texture = useLoader(TextureLoader, imageUrl || "/images/supplication.jpg");
      const material = useMemo(() => {
            return new THREE.ShaderMaterial({
                  uniforms: {
                        u_time: { value: 0 },
                        u_texture: { value: texture },
                        u_resolution: { value: new THREE.Vector2(800, 600) },
                        u_blueish: { value: 0 },
                        u_scale: { value: 5 },
                        u_illumination: { value: 1 },
                        u_surfaceDistortion: { value: 1 },
                        u_waterDistortion: { value: 0.08 },
                  },
                  vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
                  fragmentShader: `
        uniform float u_time;
        uniform sampler2D u_texture;
        uniform vec2 u_resolution;
        uniform float u_blueish;
        uniform float u_scale;
        uniform float u_illumination;
        uniform float u_surfaceDistortion;
        uniform float u_waterDistortion;
        varying vec2 vUv;

        // Noise functions
        vec3 mod289(vec3 x) {
          return x - floor(x * (1.0 / 289.0)) * 289.0;
        }

        vec2 mod289(vec2 x) {
          return x - floor(x * (1.0 / 289.0)) * 289.0;
        }

        vec3 permute(vec3 x) {
          return mod289(((x*34.0)+1.0)*x);
        }

        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187,
                              0.366025403784439,
                             -0.577350269189626,
                              0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        mat2 rotate2D(float r) {
          return mat2(cos(r), sin(r), -sin(r), cos(r));
        }

        float surface_noise(vec2 uv, float t, float scale) {
          vec2 n = vec2(0.0);
          vec2 N = vec2(0.0);
          mat2 m = rotate2D(0.8);
          for (int j = 0; j < 6; j++) {
            uv *= m;
            n *= m;
            vec2 q = uv * scale + float(j) + n + sin(t * 0.5) * (mod(float(j), 2.0) * 2.0 - 1.0);
            n += sin(q);
            N += cos(q) / scale;
            scale *= 1.2;
          }
          return (N.x + N.y);
        }

        void main() {
          vec2 uv = vUv;
          float t = u_time * 0.001;
          
          // Create water noise
          float outer_noise = snoise((0.4 + 0.1 * sin(t * 0.8)) * uv + vec2(0.0, 0.15 * t));
          vec2 surface_noise_uv = 2.2 * uv + (outer_noise * 0.25);
          
          float surface_noise_val = surface_noise(surface_noise_uv, t, u_scale);
          surface_noise_val *= pow(max(0.0, uv.y - 0.1), 0.4);
          surface_noise_val = pow(max(0.0, surface_noise_val), 1.8);
          
          // Distort UV coordinates
          vec2 distorted_uv = uv;
          distorted_uv += u_waterDistortion * outer_noise;
          distorted_uv += u_surfaceDistortion * surface_noise_val;
          
          // Sample the texture
          vec4 texColor = texture2D(u_texture, distorted_uv);
          
          // Apply lighting effects
          texColor.rgb *= (1.0 + u_illumination * surface_noise_val);
          
          // Add surface highlights
          vec3 highlight = u_illumination * vec3(1.0 - u_blueish, 1.0 - u_blueish * 0.5, 1.0) * surface_noise_val;
          texColor.rgb += highlight;
          
          // Edge fading
          float edge_width = 0.03;
          float edge_alpha = smoothstep(0.0, edge_width, distorted_uv.x) * smoothstep(1.0, 1.0 - edge_width, distorted_uv.x);
          edge_alpha *= smoothstep(0.0, edge_width, distorted_uv.y) * smoothstep(1.0, 1.0 - edge_width, distorted_uv.y);
          
          texColor.rgb *= edge_alpha;
          texColor.a *= edge_alpha;
          
          gl_FragColor = texColor;
        }
      `,
                  transparent: true,
                  side: THREE.DoubleSide,
            });
      }, [texture]);
      useFrame(({ clock }) => {
            if (meshRef.current && meshRef.current.material.uniforms) {
                  meshRef.current.material.uniforms.u_time.value = clock.elapsedTime * 3500;
            }
      });
      useMemo(() => {
            if (material.uniforms.u_texture && texture) {
                  material.uniforms.u_texture.value = texture;
                  material.uniforms.u_texture.value.needsUpdate = true;
            }
      }, [texture, material]);

      return (
            <mesh ref={meshRef} material={material}>
                  <planeGeometry args={[2, 2]} />
            </mesh>
      );
}
function WaterScene({ imageUrl }) {
      return (
            <>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  <WaterShader imageUrl={imageUrl} />
            </>
      );
}
const Card = () => {
      const { playingMusicInfo } = useContext(PlayingMusic);

      console.log("Rendering water distortion for:", playingMusicInfo?.image);

      return (
            <div className="h-72 sm:h-64 lg:h-80 xl:left-[60%] lg:left-[55%]  w-[80%] 2xl:w-[65%] absolute left-1/2 rounded-md -translate-y-1/2 -translate-x-1/2 top-1/2 sm:top-[54%] ">
                  <div className="absolute inset-0 rounded-md ">
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
                                    borderRadius: "0.375rem",
                              }}
                        >
                              <WaterScene imageUrl={playingMusicInfo?.image} />
                        </Canvas>
                  </div>
            </div>
      );
};

export default Card;
