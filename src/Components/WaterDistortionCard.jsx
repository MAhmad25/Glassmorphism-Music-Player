import { useContext, useRef, useEffect, useState } from "react";
import { PlayingMusic } from "../Contexts/Context";

const WaterDistortionCard = () => {
      const { playingMusicInfo } = useContext(PlayingMusic);
      const canvasRef = useRef(null);
      const imageRef = useRef(null);
      const animationRef = useRef();
      const glRef = useRef(null);
      const programRef = useRef(null);
      const uniformsRef = useRef(null);
      const startTimeRef = useRef(performance.now());
      const textureRef = useRef(null);

      const [isLoaded, setIsLoaded] = useState(false);
      const [error, setError] = useState(null);
      const [loadingStep, setLoadingStep] = useState("Initializing...");

      // Shader parameters - Make effects more visible for testing
      const params = {
            blueish: 0.8,
            scale: 12,
            illumination: 0.077,
            surfaceDistortion: 0.12,
            waterDistortion: 0.04208,
      };

      // Vertex shader source
      const vertexShaderSource = `
    attribute vec2 a_position;
    varying vec2 vUv;
    void main() {
        vUv = 0.5 * (a_position + 1.0);
        gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

      // Fragment shader source
      const fragmentShaderSource = `
    precision mediump float;
    varying vec2 vUv;
    uniform sampler2D u_image_texture;
    uniform float u_time;
    uniform float u_ratio;
    uniform float u_img_ratio;
    uniform float u_blueish;
    uniform float u_scale;
    uniform float u_illumination;
    uniform float u_surface_distortion;
    uniform float u_water_distortion;

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
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
    }

    mat2 rotate2D(float r) {
        return mat2(cos(r), sin(r), -sin(r), cos(r));
    }

    float surface_noise(vec2 uv, float t, float scale) {
        vec2 n = vec2(0.1);
        vec2 N = vec2(0.1);
        mat2 m = rotate2D(0.5);
        for (int j = 0; j < 8; j++) {
            uv *= m;
            n *= m;
            vec2 q = uv * scale + float(j) + n + (0.5 + 0.5 * float(j)) * (mod(float(j), 2.0) - 1.0) * t;
            n += sin(q);
            N += cos(q) / scale;
            scale *= 1.2;
        }
        return (N.x + N.y + 0.1);
    }

    void main() {
        vec2 uv = vUv;
        uv.y = 1.0 - uv.y;
        uv.x *= u_ratio;

        float t = 0.002 * u_time;
        vec3 color = vec3(0.0);
        float opacity = 0.0;

        float outer_noise = snoise((0.3 + 0.1 * sin(t)) * uv + vec2(0.0, 0.2 * t));
        vec2 surface_noise_uv = 2.0 * uv + (outer_noise * 0.2);

        float surface_noise_val = surface_noise(surface_noise_uv, t, u_scale);
        surface_noise_val *= pow(uv.y, 0.3);
        surface_noise_val = pow(surface_noise_val, 2.0);

        vec2 img_uv = vUv;
        img_uv -= 0.5;
        if (u_ratio > u_img_ratio) {
            img_uv.x = img_uv.x * u_ratio / u_img_ratio;
        } else {
            img_uv.y = img_uv.y * u_img_ratio / u_ratio;
        }
        float scale_factor = 1.0;
        img_uv *= scale_factor;
        img_uv += 0.5;
        img_uv.y = 1.0 - img_uv.y;

        img_uv += (u_water_distortion * outer_noise);
        img_uv += (u_surface_distortion * surface_noise_val);

        vec4 img = texture2D(u_image_texture, img_uv);
        img *= (1.0 + u_illumination * surface_noise_val);

        color += img.rgb;
        color += u_illumination * vec3(1.0 - u_blueish, 1.0, 1.0) * surface_noise_val;
        opacity += img.a;

        float edge_width = 0.02;
        float edge_alpha = smoothstep(0.0, edge_width, img_uv.x) * smoothstep(1.0, 1.0 - edge_width, img_uv.x);
        edge_alpha *= smoothstep(0.0, edge_width, img_uv.y) * smoothstep(1.0, 1.0 - edge_width, img_uv.y);
        color *= edge_alpha;
        opacity *= edge_alpha;

        gl_FragColor = vec4(color, opacity);
    }
  `;

      const createShader = (gl, sourceCode, type) => {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, sourceCode);
            gl.compileShader(shader);

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                  const error = gl.getShaderInfoLog(shader);
                  console.error("Shader compilation error:", error);
                  gl.deleteShader(shader);
                  setError(`Shader error: ${error}`);
                  return null;
            }
            return shader;
      };

      const createShaderProgram = (gl, vertexShader, fragmentShader) => {
            const program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);

            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                  const error = gl.getProgramInfoLog(program);
                  console.error("Shader program linking error:", error);
                  setError(`Program error: ${error}`);
                  return null;
            }
            return program;
      };

      const getUniforms = (gl, program) => {
            const uniforms = {};
            const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
            for (let i = 0; i < uniformCount; i++) {
                  const uniformInfo = gl.getActiveUniform(program, i);
                  const uniformName = uniformInfo.name;
                  uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
            }
            return uniforms;
      };

      const initWebGL = () => {
            const canvas = canvasRef.current;
            if (!canvas) return null;

            const gl =
                  canvas.getContext("webgl", {
                        alpha: true,
                        premultipliedAlpha: false,
                  }) ||
                  canvas.getContext("experimental-webgl", {
                        alpha: true,
                        premultipliedAlpha: false,
                  });

            if (!gl) {
                  setError("WebGL is not supported by your browser");
                  console.error("WebGL not supported");
                  return null;
            }

            const vertexShader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
            const fragmentShader = createShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);

            if (!vertexShader || !fragmentShader) return null;

            const program = createShaderProgram(gl, vertexShader, fragmentShader);
            if (!program) return null;

            const uniforms = getUniforms(gl, program);

            // Create and bind vertex buffer
            const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
            const vertexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            gl.useProgram(program);

            const positionLocation = gl.getAttribLocation(program, "a_position");
            gl.enableVertexAttribArray(positionLocation);
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

            // Enable blending
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

            glRef.current = gl;
            programRef.current = program;
            uniformsRef.current = uniforms;

            return gl;
      };

      const updateUniforms = () => {
            const gl = glRef.current;
            const uniforms = uniformsRef.current;

            if (!gl || !uniforms) return;

            gl.uniform1f(uniforms.u_blueish, params.blueish);
            gl.uniform1f(uniforms.u_scale, params.scale);
            gl.uniform1f(uniforms.u_illumination, params.illumination);
            gl.uniform1f(uniforms.u_surface_distortion, params.surfaceDistortion);
            gl.uniform1f(uniforms.u_water_distortion, params.waterDistortion);
      };

      const loadImage = (src) => {
            if (!src) {
                  setError("No image source provided");
                  return;
            }

            console.log("Loading image:", src);
            setLoadingStep("Loading image...");

            const image = new Image();
            image.crossOrigin = "anonymous";

            // Set timeout for image loading
            const imageTimeout = setTimeout(() => {
                  setError("Image loading timeout");
                  console.error("Image loading timeout for:", src);
            }, 10000); // 10 second timeout

            image.onload = () => {
                  clearTimeout(imageTimeout);
                  console.log("Image loaded successfully:", image.naturalWidth, "x", image.naturalHeight);
                  setLoadingStep("Creating texture...");

                  const gl = glRef.current;
                  const uniforms = uniformsRef.current;

                  if (!gl || !uniforms) {
                        setError("WebGL context not available");
                        return;
                  }

                  try {
                        // Clean up previous texture
                        if (textureRef.current) {
                              gl.deleteTexture(textureRef.current);
                        }

                        const texture = gl.createTexture();
                        gl.activeTexture(gl.TEXTURE0);
                        gl.bindTexture(gl.TEXTURE_2D, texture);

                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

                        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                        gl.uniform1i(uniforms.u_image_texture, 0);

                        textureRef.current = texture;
                        imageRef.current = image;

                        setLoadingStep("Resizing canvas...");

                        // Force a small delay to ensure texture is ready
                        setTimeout(() => {
                              resizeCanvas();
                              setIsLoaded(true);
                              setError(null);
                              setLoadingStep("");
                              console.log("Texture loaded and ready");
                        }, 100);
                  } catch (err) {
                        clearTimeout(imageTimeout);
                        console.error("Error loading texture:", err);
                        setError("Failed to load texture");
                  }
            };

            image.onerror = (err) => {
                  clearTimeout(imageTimeout);
                  console.error("Failed to load image:", src, err);
                  setError(`Failed to load image: ${src}`);
            };

            image.src = src;
      };

      const resizeCanvas = () => {
            const canvas = canvasRef.current;
            const image = imageRef.current;
            const gl = glRef.current;
            const uniforms = uniformsRef.current;

            if (!canvas || !image || !gl || !uniforms) {
                  console.log("Resize skipped - missing refs");
                  return;
            }

            try {
                  const rect = canvas.getBoundingClientRect();

                  // Skip if canvas has no dimensions
                  if (rect.width === 0 || rect.height === 0) {
                        console.log("Canvas has no dimensions, retrying...");
                        setTimeout(resizeCanvas, 100);
                        return;
                  }

                  const devicePixelRatio = Math.min(window.devicePixelRatio, 2);

                  canvas.width = rect.width * devicePixelRatio;
                  canvas.height = rect.height * devicePixelRatio;

                  // Set canvas display size
                  canvas.style.width = rect.width + "px";
                  canvas.style.height = rect.height + "px";

                  gl.viewport(0, 0, canvas.width, canvas.height);

                  const canvasRatio = canvas.width / canvas.height;
                  const imgRatio = image.naturalWidth / image.naturalHeight;

                  gl.uniform1f(uniforms.u_ratio, canvasRatio);
                  gl.uniform1f(uniforms.u_img_ratio, imgRatio);

                  console.log("Canvas resized:", canvas.width, "x", canvas.height, "ratio:", canvasRatio, "img ratio:", imgRatio);
            } catch (err) {
                  console.error("Error resizing canvas:", err);
            }
      };

      const render = () => {
            const gl = glRef.current;
            const uniforms = uniformsRef.current;

            if (!gl || !uniforms || !isLoaded) {
                  animationRef.current = requestAnimationFrame(render);
                  return;
            }

            try {
                  const currentTime = performance.now() - startTimeRef.current;
                  gl.uniform1f(uniforms.u_time, currentTime);

                  // Clear with transparent background
                  gl.clearColor(0, 0, 0, 0);
                  gl.clear(gl.COLOR_BUFFER_BIT);

                  // Make sure we're using the right program and texture
                  gl.useProgram(programRef.current);
                  gl.activeTexture(gl.TEXTURE0);
                  gl.bindTexture(gl.TEXTURE_2D, textureRef.current);

                  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

                  // Force a flush to ensure rendering
                  gl.flush();
            } catch (err) {
                  console.error("Render error:", err);
            }

            animationRef.current = requestAnimationFrame(render);
      };

      // Initialize WebGL on mount
      useEffect(() => {
            console.log("Initializing WebGL...");
            setLoadingStep("Initializing WebGL...");

            // Small delay to ensure DOM is ready
            const initTimer = setTimeout(() => {
                  const gl = initWebGL();
                  if (!gl) {
                        setError("Failed to initialize WebGL");
                        return;
                  }

                  setLoadingStep("Setting up shaders...");
                  updateUniforms();

                  const handleResize = () => {
                        // Debounce resize calls
                        clearTimeout(window.resizeTimeout);
                        window.resizeTimeout = setTimeout(resizeCanvas, 100);
                  };

                  window.addEventListener("resize", handleResize);

                  // Start render loop
                  animationRef.current = requestAnimationFrame(render);
                  setLoadingStep("WebGL ready");

                  return () => {
                        window.removeEventListener("resize", handleResize);
                        if (animationRef.current) {
                              cancelAnimationFrame(animationRef.current);
                        }
                        // Clean up WebGL resources
                        if (textureRef.current && gl) {
                              gl.deleteTexture(textureRef.current);
                        }
                        clearTimeout(window.resizeTimeout);
                  };
            }, 50);

            return () => {
                  clearTimeout(initTimer);
                  if (animationRef.current) {
                        cancelAnimationFrame(animationRef.current);
                  }
            };
      }, []);

      // Load image when playingMusicInfo changes
      useEffect(() => {
            if (playingMusicInfo?.image && glRef.current) {
                  setIsLoaded(false);
                  setError(null);
                  startTimeRef.current = performance.now();

                  // Small delay to ensure WebGL context is stable
                  setTimeout(() => {
                        loadImage(playingMusicInfo.image);
                  }, 50); // Reduced delay
            }
      }, [playingMusicInfo?.image, playingMusicInfo]);

      // Fallback to regular image if WebGL fails
      if (error) {
            console.log("Falling back to regular image due to error:", error);
            return (
                  <div className="h-72 sm:h-64 lg:h-80 xl:left-[60%] lg:left-[55%]    w-[80%] 2xl:w-[65%] absolute left-1/2 rounded-md -translate-y-1/2 -translate-x-1/2 top-1/2 sm:top-[54%] ">
                        <img className="w-full h-full object-cover" src={playingMusicInfo?.image} alt={playingMusicInfo?.title || "Album cover"} />
                  </div>
            );
      }

      return (
            <div className="h-72 sm:h-64 lg:h-80 xl:left-[60%] lg:left-[55%]    w-[80%] 2xl:w-[65%] absolute left-1/2 rounded-md -translate-y-1/2 -translate-x-1/2 top-1/2 sm:top-[54%] ">
                  {/* Debug canvas - add red border temporarily */}
                  <canvas
                        ref={canvasRef}
                        className="w-full h-full block"
                        style={{
                              opacity: isLoaded ? 1 : 0,
                              transition: "opacity 0.3s ease-in-out",
                              position: "absolute",
                              top: 0,
                              left: 0,
                              zIndex: 2,
                        }}
                  />
                  {/* Fallback image */}
                  {!isLoaded && !error && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-sm z-10">
                              <div className="flex flex-col items-center space-y-2">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">{loadingStep || "Loading effect..."}</p>
                              </div>
                        </div>
                  )}
            </div>
      );
};

export default WaterDistortionCard;
