"use client";
// ============================================================================
// IMPORTS
// ============================================================================
import { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3, Group, Sprite, SpriteMaterial, CanvasTexture } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";

// ============================================================================
// TYPE DEFINITIONS - Extend React Three Fiber to recognize ThreeGlobe
// ============================================================================
declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: ThreeElements["mesh"] & {
      new(): ThreeGlobe;
    };
  }
}

// Register ThreeGlobe as a React Three Fiber component
extend({ ThreeGlobe: ThreeGlobe });

// ============================================================================
// CONSTANTS - Camera and rendering configuration
// ============================================================================
const aspect = 1.2; // Camera aspect ratio
const cameraZ = 300; // Fixed camera distance from globe

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

// Position data for points/arcs on the globe
type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
  image?: string; // Optional image URL for pin markers
};

// Configuration options for the globe appearance and behavior
export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

// Props for the World component
interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

// ============================================================================
// GLOBE COMPONENT - Main component that renders the 3D globe
// ============================================================================
export function Globe({ globeConfig, data }: WorldProps) {
  // Refs to access Three.js objects
  const globeRef = useRef<ThreeGlobe | null>(null); // Reference to the ThreeGlobe instance
  const groupRef = useRef<Group>(null); // Reference to the Three.js Group container
  const [isInitialized, setIsInitialized] = useState(false); // Track if globe is initialized

  // Default configuration values that can be overridden by globeConfig
  const defaultProps = {
    pointSize: 2,
    atmosphereColor: "#ffffff",
    showAtmosphere: false,
    atmosphereAltitude: 0.1,
    polygonColor: "rgb(255, 255, 255)",
    globeColor: "#FFFFFF", // White globe color
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  };

  // ============================================================================
  // INITIALIZATION - Create the globe instance and add it to the scene
  // ============================================================================
  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      // Create a new ThreeGlobe instance
      globeRef.current = new ThreeGlobe();
      // Add the globe to the Three.js group
      groupRef.current.add(globeRef.current);
      // Mark as initialized so other effects can run
      setIsInitialized(true);
    }
  }, []);

  // ============================================================================
  // MATERIAL CONFIGURATION - Set the globe's visual appearance (color, shininess, etc.)
  // ============================================================================
  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    // Get the globe's material and configure its properties
    const globeMaterial = globeRef.current.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };
    // Set the base color of the globe
    globeMaterial.color = new Color(globeConfig.globeColor);
    // Set the emissive (glowing) color
    globeMaterial.emissive = new Color(globeConfig.emissive);
    // Set how bright the glow is (0-1)
    globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
    // Set how shiny/reflective the surface is (0-1)
    globeMaterial.shininess = globeConfig.shininess || 0.9;
  }, [
    isInitialized,
    globeConfig.globeColor,
    globeConfig.emissive,
    globeConfig.emissiveIntensity,
    globeConfig.shininess,
  ]);

  // ============================================================================
  // DATA PROCESSING - Process position data and render pins/points on the globe
  // ============================================================================
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    const arcs = data;
    // Extract points from arcs (each arc has a start and end point)
    const points = [];
    for (let i = 0; i < arcs.length; i++) {
      const arc = arcs[i];
      // Add start point
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.startLat,
        lng: arc.startLng,
        image: arc.image, // Optional image for pin marker
      });
      // Add end point
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.endLat,
        lng: arc.endLng,
        image: arc.image, // Optional image for pin marker
      });
    }

    // Remove duplicate points that have the same latitude and longitude
    // This prevents multiple pins from appearing at the same location
    const filteredPoints = points.filter(
      (v, i, a) =>
        a.findIndex((v2) =>
          ["lat", "lng"].every(
            (k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"],
          ),
        ) === i,
    );

    // ========================================================================
    // GLOBE SURFACE - Configure the globe's country polygons and atmosphere
    // ========================================================================
    globeRef.current
      .hexPolygonsData(countries.features) // Load country/region data from GeoJSON
      .hexPolygonResolution(3) // Level of detail for hexagons (higher = more detailed)
      .hexPolygonMargin(0.7) // Spacing between hexagons (0-1)
      .showAtmosphere(defaultProps.showAtmosphere) // Enable/disable atmosphere glow
      .atmosphereColor(defaultProps.atmosphereColor) // Color of the atmosphere
      .atmosphereAltitude(defaultProps.atmosphereAltitude) // Height of atmosphere (0-1)
      .hexPolygonColor(() => defaultProps.polygonColor); // Color of country polygons

    // globeRef.current
    //   .arcsData(data)
    //   .arcStartLat((d) => (d as { startLat: number }).startLat * 1)
    //   .arcStartLng((d) => (d as { startLng: number }).startLng * 1)
    //   .arcEndLat((d) => (d as { endLat: number }).endLat * 1)
    //   .arcEndLng((d) => (d as { endLng: number }).endLng * 1)
    //   .arcColor((e: any) => (e as { color: string }).color)
    //   .arcAltitude((e) => (e as { arcAlt: number }).arcAlt * 1)
    //   .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
    //   .arcDashLength(defaultProps.arcLength)
    //   .arcDashInitialGap((e) => (e as { order: number }).order * 1)
    //   .arcDashGap(15)
    //   .arcDashAnimateTime(() => defaultProps.arcTime);

    // globeRef.current
    //   .pointsData(filteredPoints)
    //   .pointColor((e) => (e as { color: string }).color)
    //   .pointsMerge(true)
    //   .pointAltitude(0.0)
    //   .pointRadius(2);

    // ========================================================================
    // PIN TEXTURE CREATION - Create custom pin marker textures with optional images
    // ========================================================================
    const createPinTexture = (image?: string) => {
      // Create a canvas to draw the pin shape
      const canvas = document.createElement("canvas");
      canvas.width = 64; // Pin texture width
      canvas.height = 64; // Pin texture height
      const texture = new CanvasTexture(canvas); // Create Three.js texture from canvas
      const ctx = canvas.getContext("2d");
      
      if (ctx) {
        // Draw the pin shape (red teardrop/marker pin)
        ctx.fillStyle = "#ff0000"; // Bright red color for the pin
        ctx.beginPath();
        ctx.moveTo(32, 64); // Bottom center point
        ctx.lineTo(14, 30); // Left side of pin
        ctx.arc(32, 24, 20, Math.PI - 0.3, Math.PI * 2 + 0.3); // Pin head circle
        ctx.lineTo(32, 64); // Back to bottom center
        ctx.fill(); // Fill the pin shape

        // If an image is provided, draw it inside the pin head
        if (image) {
          const img = new Image();
          img.src = image;
          img.onload = () => {
            // Draw image inside a circular area in the pin head
            ctx.save(); // Save current drawing state
            ctx.beginPath();
            ctx.arc(32, 24, 16, 0, Math.PI * 2); // Smaller circle for image
            ctx.clip(); // Clip to this circle
            ctx.drawImage(img, 12, 4, 40, 40); // Draw image at specified position
            ctx.restore(); // Restore drawing state
            // Mark texture as needing update so changes are visible
            texture.needsUpdate = true;
          };
        }
      }
      return texture;
    }

    // ========================================================================
    // PIN MARKERS - Place pin markers on the globe at specified coordinates
    // ========================================================================
    globeRef.current
      .objectsData(filteredPoints) // Data for pin markers
      .objectThreeObject((d: { image?: string }) => {
        // Create a sprite (2D object) for each pin marker
        const pinTexture = createPinTexture(d.image); // Generate pin texture
        const pinMaterial = new SpriteMaterial({ map: pinTexture }); // Material with texture
        const sprite = new Sprite(pinMaterial); // Create sprite object
        sprite.scale.set(8, 8, 1); // Set pin size (width, height, depth) - smaller pins
        sprite.center.set(0.5, 0); // Anchor point at bottom center (so pin sits on globe)
        return sprite;
      })
      .objectLat((d) => (d as { lat: number }).lat) // Get latitude from data
      .objectLng((d) => (d as { lng: number }).lng) // Get longitude from data
      .objectAltitude(0.01); // Height above globe surface (slightly elevated)

    // ========================================================================
    // RINGS - Configure animated rings (currently disabled, set to empty array)
    // ========================================================================
    globeRef.current
      .ringsData([]) // Empty array means no rings are displayed
      // Uncomment below to enable animated rings around points:
      // .ringColor(() => defaultProps.polygonColor) // Ring color
      // .ringMaxRadius(defaultProps.maxRings) // Maximum ring radius
      // .ringPropagationSpeed(RING_PROPAGATION_SPEED) // Speed of ring expansion
      // .ringRepeatPeriod((defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings) // Time between rings
  }, [
    isInitialized,
    data,
    defaultProps.pointSize,
    defaultProps.showAtmosphere,
    defaultProps.atmosphereColor,
    defaultProps.atmosphereAltitude,
    defaultProps.polygonColor,
    defaultProps.arcLength,
    defaultProps.arcTime,
    defaultProps.rings,
    defaultProps.maxRings,
  ]);

  // ============================================================================
  // ANIMATION - Rotate the globe continuously (called every frame)
  // ============================================================================
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Rotate the globe along the X axis at the specified speed
    // delta = time since last frame (for smooth animation)
    groupRef.current.rotation.x += delta * (globeConfig.autoRotateSpeed || 0.1);
  });

  // Return the Three.js group that contains the globe
  return <group ref={groupRef} />;
}

// ============================================================================
// WEBGL RENDERER CONFIGURATION - Configure the Three.js renderer settings
// ============================================================================
export function WebGLRendererConfig() {
  const { gl, size } = useThree(); // Get renderer and canvas size from React Three Fiber

  useEffect(() => {
    // Set pixel ratio for high-DPI displays (retina screens)
    gl.setPixelRatio(window.devicePixelRatio);
    // Set renderer size to match canvas size
    gl.setSize(size.width, size.height);
    // Set clear color (background) - transparent in this case
    gl.setClearColor(0xffaaff, 0); // Color with alpha 0 (transparent)
  }, [gl, size.width, size.height]);

  return null; // This component doesn't render anything visible
}

// ============================================================================
// WORLD COMPONENT - Main wrapper that sets up the 3D scene, camera, and lighting
// ============================================================================
export function World(props: WorldProps) {
  const { globeConfig } = props;
  
  // Create a Three.js scene
  const scene = new Scene();
  // Add fog effect for depth (near distance, far distance)
  scene.fog = new Fog(0xffffff, 400, 2000);

  return (
    <Canvas 
      scene={scene} 
      camera={new PerspectiveCamera(50, aspect, 180, 1800)} // Camera: FOV, aspect, near, far
    >
      {/* Configure the WebGL renderer */}
      <WebGLRendererConfig />
      
      {/* ==================================================================== */}
      {/* LIGHTING SETUP - Multiple light sources for realistic globe shading */}
      {/* ==================================================================== */}
      {/* Ambient light - provides base illumination from all directions */}
      <ambientLight color={globeConfig.ambientLight} intensity={8} />
      
      {/* Directional light from the left side */}
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new Vector3(-400, 100, 400)}
      />
      
      {/* Directional light from the top */}
      <directionalLight
        color={globeConfig.directionalTopLight}
        position={new Vector3(-200, 500, 200)}
      />
      
      {/* Point light - adds brightness at a specific point */}
      <pointLight
        color={globeConfig.pointLight}
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />
      
      {/* Render the globe component */}
      <Globe {...props} />
      
      {/* ==================================================================== */}
      {/* CAMERA CONTROLS - User interaction controls (currently disabled) */}
      {/* ==================================================================== */}
      <OrbitControls
        enablePan={false} // Disable panning (moving camera sideways)
        enableZoom={false} // Disable zooming
        minDistance={cameraZ} // Fixed minimum camera distance
        maxDistance={cameraZ} // Fixed maximum camera distance (locked)
        autoRotateSpeed={1} // Speed if auto-rotate was enabled
        autoRotate={false} // Disable automatic rotation
        minPolarAngle={Math.PI / 3.5} // Limit vertical rotation (min angle)
        maxPolarAngle={Math.PI - Math.PI / 3} // Limit vertical rotation (max angle)
      />
    </Canvas>
  );
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Convert a hexadecimal color string to RGB object
 * @param hex - Hex color string (e.g., "#ff0000" or "ff0000")
 * @returns RGB object with r, g, b values (0-255) or null if invalid
 */
export function hexToRgb(hex: string) {
  // Handle shorthand hex (e.g., "#f00" -> "#ff0000")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  // Parse full hex color (e.g., "#ff0000")
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16), // Convert hex to decimal
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : null;
}

/**
 * Generate an array of unique random numbers within a range
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (exclusive)
 * @param count - Number of unique random numbers to generate
 * @returns Array of unique random numbers
 */
export function genRandomNumbers(min: number, max: number, count: number) {
  const arr = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    // Only add if not already in array (ensure uniqueness)
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
}


