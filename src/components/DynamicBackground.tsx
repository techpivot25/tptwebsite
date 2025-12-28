import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const DynamicBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const animationIdRef = useRef<number | null>(null);
    const objectsRef = useRef<THREE.Mesh[]>([]);

    useEffect(() => {
        if (!containerRef.current) return;

        try {
            // Get container dimensions
            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;

            // Scene Setup
            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0x0a0e27);
            sceneRef.current = scene;

            // Camera
            const camera = new THREE.PerspectiveCamera(
                75,
                width / height,
                0.1,
                1000
            );
            camera.position.z = 30;

            // Renderer
            const renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: false,
                powerPreference: 'high-performance'
            });
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
            renderer.setClearColor(0x0a0e27, 1);
            renderer.shadowMap.enabled = true;

            containerRef.current.appendChild(renderer.domElement);
            rendererRef.current = renderer;

            // Lighting Setup
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
            scene.add(ambientLight);

            const pointLight1 = new THREE.PointLight(0x6366f1, 2, 100);
            pointLight1.position.set(20, 20, 20);
            pointLight1.castShadow = true;
            scene.add(pointLight1);

            const pointLight2 = new THREE.PointLight(0x8b5cf6, 1.5, 80);
            pointLight2.position.set(-20, -20, 15);
            scene.add(pointLight2);

            const pointLight3 = new THREE.PointLight(0x06b6d4, 1.2, 60);
            pointLight3.position.set(0, 30, -20);
            scene.add(pointLight3);

            // Create Animated Objects
            const geometries = [
                new THREE.IcosahedronGeometry(2, 4),
                new THREE.OctahedronGeometry(1.5, 3),
                new THREE.TetrahedronGeometry(1.5),
                new THREE.SphereGeometry(1.5, 32, 32),
                new THREE.BoxGeometry(2, 2, 2),
                new THREE.DodecahedronGeometry(1.5, 0),
            ];

            const colors = [0x6366f1, 0x8b5cf6, 0xec4899, 0x06b6d4, 0x10b981, 0xf59e0b];
            const objects: THREE.Mesh[] = [];

            for (let i = 0; i < 8; i++) {
                const geometry = geometries[i % geometries.length];
                const color = colors[i % colors.length];

                const material = new THREE.MeshStandardMaterial({
                    color: color,
                    metalness: 0.6,
                    roughness: 0.2,
                    emissive: color,
                    emissiveIntensity: 0.3,
                });

                const mesh = new THREE.Mesh(geometry, material);
                mesh.castShadow = true;
                mesh.receiveShadow = true;

                // Random position
                mesh.position.x = (Math.random() - 0.5) * 60;
                mesh.position.y = (Math.random() - 0.5) * 60;
                mesh.position.z = (Math.random() - 0.5) * 40;

                // Random rotation
                mesh.rotation.x = Math.random() * Math.PI;
                mesh.rotation.y = Math.random() * Math.PI;
                mesh.rotation.z = Math.random() * Math.PI;

                scene.add(mesh);
                objects.push(mesh);
            }

            objectsRef.current = objects;

            // Mouse tracking
            let mouseX = 0;
            let mouseY = 0;
            const onMouseMove = (event: MouseEvent) => {
                mouseX = (event.clientX / window.innerWidth) * 2 - 1;
                mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            };
            window.addEventListener('mousemove', onMouseMove);

            // Animation loop
            const animate = () => {
                animationIdRef.current = requestAnimationFrame(animate);

                const time = Date.now() * 0.0005;

                // Animate objects
                objects.forEach((obj, index) => {
                    // Rotation
                    obj.rotation.x += 0.003 + index * 0.0001;
                    obj.rotation.y += 0.004 + index * 0.0002;
                    obj.rotation.z += 0.002;

                    // Orbital motion
                    const orbitRadius = 15 + index * 1.5;
                    const orbitSpeed = 0.001 * (index + 1);
                    obj.position.x = Math.cos(time * orbitSpeed) * orbitRadius;
                    obj.position.y = Math.sin(time * orbitSpeed * 0.7) * orbitRadius;
                    obj.position.z = Math.sin(time * orbitSpeed * 0.5) * (orbitRadius * 0.5);

                    // Pulsing scale
                    const scale = 1 + Math.sin(time + index) * 0.2;
                    obj.scale.set(scale, scale, scale);

                    // Update emissive
                    const material = obj.material as THREE.MeshStandardMaterial;
                    if (material.emissiveIntensity !== undefined) {
                        material.emissiveIntensity = 0.3 + Math.sin(time * 2 + index) * 0.2;
                    }
                });

                // Camera follows mouse smoothly
                camera.position.x += (mouseX * 8 - camera.position.x) * 0.05;
                camera.position.y += (mouseY * 8 - camera.position.y) * 0.05;
                camera.lookAt(0, 0, 0);

                renderer.render(scene, camera);
            };

            animate();

            // Handle resize
            const handleResize = () => {
                if (!containerRef.current) return;
                const newWidth = containerRef.current.clientWidth;
                const newHeight = containerRef.current.clientHeight;

                camera.aspect = newWidth / newHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(newWidth, newHeight);
            };

            window.addEventListener('resize', handleResize);

            // Cleanup
            return () => {
                window.removeEventListener('resize', handleResize);
                window.removeEventListener('mousemove', onMouseMove);

                if (animationIdRef.current !== null) {
                    cancelAnimationFrame(animationIdRef.current);
                }

                renderer.dispose();
                geometries.forEach(g => g.dispose());
                objects.forEach(obj => {
                    if (obj.material instanceof THREE.Material) {
                        obj.material.dispose();
                    }
                });

                if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
                    containerRef.current.removeChild(renderer.domElement);
                }
            };
        } catch (error) {
            console.error('Three.js initialization error:', error);
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden'
            }}
        />
    );
};

export default DynamicBackground;
