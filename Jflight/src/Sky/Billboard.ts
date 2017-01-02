
var textureLoader = new THREE.TextureLoader();


class Billboard {
    private mesh: THREE.Mesh;

    static up = new THREE.Vector3(0, 0, 1);
    static matrix = new THREE.Matrix4();
    constructor(scene: THREE.Scene, url: string) {
        let texture = textureLoader.load(url);
        let material = new THREE.MeshBasicMaterial({ map: texture, depthWrite: false, depthTest: false, transparent: true });
        let geometry = new THREE.PlaneGeometry(1000, 1000);
        this.mesh = new THREE.Mesh(geometry, material);
        let mesh = this.mesh;
        mesh.rotateZ(Math.random() * Math.PI);
        scene.add(mesh);
    }

    public setPsosition(x: number, y: number, z: number) {
        let mesh = this.mesh;
        mesh.position.set(x, y, z);
    }

    public quaternion(newQuaternion: THREE.Quaternion) {
        let mesh = this.mesh;
        mesh.quaternion.copy(newQuaternion);
    }

    public update(position: THREE.Vector3) {
        let mesh = this.mesh;
        let m = Billboard.matrix;
        let up = Billboard.up;
        m.lookAt(position, mesh.position, up);

        mesh.setRotationFromMatrix(m);
    }

    public _update(matrix: THREE.Matrix4) {
        let mesh = this.mesh;

        mesh.setRotationFromMatrix(matrix);
    }
}