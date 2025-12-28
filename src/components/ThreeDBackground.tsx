import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface Particle {
    mesh: THREE.Mesh;
    velocity: THREE.Vector3;
    angle: number;
    speed: number;
}

const ThreeDBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const animationIdRef = useRef<number | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        try {
            // Scene setup
            const scene = new THREE.Scene();
            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;

            const camera = new THREE.PerspectiveCamera(
                75,
                width / height,
                0.1,
                2000
            );
            const renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
                precision: 'lowp'
            });

            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
            renderer.setClearColor(0x0a0e27, 0.05);
            renderer.shadowMap.enabled = true;
            containerRef.current.appendChild(renderer.domElement);
            rendererRef.current = renderer;

            camera.position.z = 100;

            // Create simple gradient background
            scene.background = new THREE.Color(0x0a0e27);
            scene.fog = new THREE.Fog(0x0a0e27, 500, 1500);

            // Create particles with various shapes
            const particles: Particle[] = [];
            const geometries = [
                new THREE.IcosahedronGeometry(3, 3),
                new THREE.OctahedronGeometry(2, 2),
                new THREE.TetrahedronGeometry(2),
                new THREE.SphereGeometry(2, 8, 8),
                new THREE.BoxGeometry(3, 3, 3),
            ];

            const colors = [0x6366f1, 0x8b5cf6, 0xec4899, 0x06b6d4, 0x10b981];

            for (let i = 0; i < 8; i++) {
                const geometry = geometries[i % geometries.length];
                const color = colors[i % colors.length];

                const material = new THREE.MeshStandardMaterial({
                    color: color,
                    metalness: 0.5,
                    roughness: 0.3,
                    emissive: color,
                    emissiveIntensity: 0.2,
                });

                const mesh = new THREE.Mesh(geometry, material);
                mesh.castShadow = true;
                mesh.receiveShadow = true;

                const distance = Math.random() * 100 + 30;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.random() * Math.PI * 2;

                mesh.position.x = distance * Math.sin(phi) * Math.cos(theta);
                mesh.position.y = distance * Math.sin(phi) * Math.sin(theta);
                mesh.position.z = distance * Math.cos(phi);

                mesh.rotation.set(
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI
                );

                scene.add(mesh);

                particles.push({
                    mesh,
                    velocity: new THREE.Vector3(
                        (Math.random() - 0.5) * 0.3,
                        (Math.random() - 0.5) * 0.3,
                        (Math.random() - 0.5) * 0.3
                    ),
                    angle: Math.random() * Math.PI * 2,
                    speed: Math.random() * 0.01 + 0.003,
                });
            }

            particlesRef.current = particles;

            // Lighting
            const pointLight1 = new THREE.PointLight(0x6366f1, 1.2, 400);
            pointLight1.position.set(80, 80, 80);
            pointLight1.castShadow = true;
            scene.add(pointLight1);

            const pointLight2 = new THREE.PointLight(0x8b5cf6, 0.8, 300);
            pointLight2.position.set(-80, -80, 80);
            scene.add(pointLight2);

            const pointLight3 = new THREE.PointLight(0x06b6d4, 0.6, 250);
            pointLight3.position.set(0, 100, -80);
            scene.add(pointLight3);

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
            scene.add(ambientLight);

            // Mouse tracking
            let mouseX = 0;
            let mouseY = 0;
            const onMouseMove = (event: MouseEvent) => {
                mouseX = (event.clientX / window.innerWidth) * 2 - 1;
                mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            };
            window.addEventListener('mousemove', onMouseMove);

            // Animation loop
            let frameCount = 0;
            const animate = () => {
                animationIdRef.current = requestAnimationFrame(animate);
                frameCount++;

                const time = Date.now() * 0.0001;

                particles.forEach((particle, index) => {
                    particle.mesh.rotation.x += 0.002 + index * 0.0001;
                    particle.mesh.rotation.y += 0.003 + index * 0.0002;
                    particle.mesh.rotation.z += 0.001 + index * 0.00015;

                    // Orbital movement
                    particle.angle += particle.speed;
                    const radius = 60 + Math.sin(time + index) * 15;
                    particle.mesh.position.x = Math.cos(particle.angle) * radius;
                    particle.mesh.position.y = Math.sin(particle.angle) * radius + Math.sin(time * 0.5 + index) * 20;
                    particle.mesh.position.z = Math.sin(particle.angle * 0.5) * radius + Math.cos(time + index) * 15;

                    // Emissive glow animation
                    const material = particle.mesh.material as THREE.MeshStandardMaterial;
                    if (material.emissiveIntensity !== undefined) {
                        material.emissiveIntensity = 0.2 + Math.sin(time * 2 + index) * 0.1;
                    }

                    // Distance-based scaling
                    particle.mesh.scale.set(
                        1 + Math.sin(time + index) * 0.08,
                        1 + Math.sin(time + index + 1) * 0.08,
                        1 + Math.sin(time + index + 2) * 0.08
                    );
                });

                // Smooth camera movement based on mouse (reduced sensitivity)
                camera.position.x += (mouseX * 30 - camera.position.x) * 0.03;
                camera.position.y += (mouseY * 30 - camera.position.y) * 0.03;
                camera.lookAt(0, 0, 0);

                renderer.render(scene, camera);
            };

            animate();

            // Handle window resize
            const handleResize = () => {
                if (!containerRef.current) return;
                const newWidth = containerRef.current.clientWidth;
                const newHeight = containerRef.current.clientHeight;

                camera.aspect = newWidth / newHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(newWidth, newHeight);
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                window.removeEventListener('mousemove', onMouseMove);

                if (animationIdRef.current !== null) {
                    cancelAnimationFrame(animationIdRef.current);
                }

                renderer.dispose();
                geometries.forEach(geo => geo.dispose());

                particles.forEach(p => {
                    if (p.mesh.material instanceof THREE.Material) {
                        p.mesh.material.dispose();
                    }
                });

                if (containerRef.current?.contains(renderer.domElement)) {
                    containerRef.current.removeChild(renderer.domElement);
                }
            };
        } catch (error) {
            console.error('Three.js background error:', error);
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className={`w-full h-full ${className}`}
            style={{ position: 'relative' }}
        />
    )
};

export default ThreeDBackground;
