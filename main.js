// Variabili globali
let scene, camera, renderer, controls;
let cityContainer; 
const GRID_SIZE = 100; // Variabile globale per definire l'estensione della città

// --- FUNZIONE PER LA GENERAZIONE DEGLI EDIFICI ---
function generateCity() {
    const NUM_BUILDINGS = 200; 
    const MIN_HEIGHT = 5;
    const MAX_HEIGHT = 60;

    // Colori Neon
    const neonColors = [
        new THREE.Color(0xff00ff), // Magenta
        new THREE.Color(0x00ffff), // Ciano
        new THREE.Color(0xffff00), // Giallo
        new THREE.Color(0xff8800)  // Arancio
    ];

    for (let i = 0; i < NUM_BUILDINGS; i++) {
        // 1. Dimensioni Casuali
        const buildingWidth = Math.random() * 4 + 2; 
        const buildingDepth = Math.random() * 4 + 2; 
        const buildingHeight = Math.random() * (MAX_HEIGHT - MIN_HEIGHT) + MIN_HEIGHT; 
        
        // 2. Geometria e Posizione
        const geometry = new THREE.BoxGeometry(buildingWidth, buildingHeight, buildingDepth);
        
        const x = (Math.random() - 0.5) * GRID_SIZE;
        const z = (Math.random() - 0.5) * GRID_SIZE;
        const y = buildingHeight / 2; 

        // 3. Materiale (Cyberpunk Neon con emissivo aumentato)
        const neonColor = neonColors[Math.floor(Math.random() * neonColors.length)];
        
        const material = new THREE.MeshStandardMaterial({ 
            color: 0x333333,      
            metalness: 0.9,       
            roughness: 0.5,
            emissive: neonColor,
            emissiveIntensity: 0.5 // Intensità aumentata
        });
        
        const building = new THREE.Mesh(geometry, material);
        building.position.set(x, y, z);
        
        cityContainer.add(building);
    }
}

// 4. LUCI PUNTUALI AGGIUNTE (per il vero effetto Neon)
function addNeonPointLights() {
    // 1. Luce Blu/Ciano
    const neonLight1 = new THREE.PointLight(0x00ffff, 80, 50, 2); 
    neonLight1.position.set(20, 10, 20);
    scene.add(neonLight1);

    // 2. Luce Magenta/Fucsia
    const neonLight2 = new THREE.PointLight(0xff00ff, 80, 50, 2); 
    neonLight2.position.set(-20, 10, -20);
    scene.add(neonLight2);

    // 3. Luce Gialla/Arancione
    const neonLight3 = new THREE.PointLight(0xffff00, 50, 50, 2); 
    neonLight3.position.set(0, 5, 40);
    scene.add(neonLight3);
}


// --- FUNZIONE DI INIZIALIZZAZIONE ---
function init() {
    // 1. SCENA e FOG
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050510); 
    
    // MODIFICA FONDAMENTALE: Estensione del raggio del Fog
    scene.fog = new THREE.Fog(0x050510, 10, 300); // <-- Distanza aumentata a 300

    // 2. TELECAMERA 
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1500);
    camera.position.set(0, 50, 150); 
    
    // 3. RENDERER
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // 4. CONTROLLI DELLA TELECAMERA (OrbitControls)
    if (THREE.OrbitControls) { 
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.maxPolarAngle = Math.PI * 0.495; 
        controls.target.set(0, 25, 0); 
        controls.update();
    } else {
        console.warn("OrbitControls non caricato. Controlla index.html.");
    }

    cityContainer = new THREE.Group();
    scene.add(cityContainer);

    // 5. LUCI GENERALI (Potenziate per visibilità)
    const ambientLight = new THREE.AmbientLight(0x444444, 3.0); 
    scene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0xaaaaee, 2.5); 
    dirLight.position.set(20, 100, 50);
    scene.add(dirLight);
    
    // 6. LUCI NEON AGGIUNTIVE
    addNeonPointLights();
    
    // 7. TERRENO 
    const groundGeometry = new THREE.PlaneGeometry(GRID_SIZE * 2, GRID_SIZE * 2);
    const groundMaterial = new THREE.MeshStandardMaterial({
        color: 0x010101, 
        metalness: 0.9,
        roughness: 0.1 
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);
    
    // 8. CHIAMATA ALLA GENERAZIONE
    generateCity();

    window.addEventListener('resize', onWindowResize, false);
}

// --- FUNZIONE DI RIDIMENSIONAMENTO ---
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// --- LOOP DI ANIMAZIONE ---
function animate() {
    requestAnimationFrame(animate);

    if (controls) {
        controls.update();
    }
    
    cityContainer.rotation.y += 0.0005; 

    renderer.render(scene, camera);
}

// Avvia l'applicazione
init();
animate();