namespace CameraHelper {

    var x = new THREE.Vector3();
    var y = new THREE.Vector3();
    // var z = new THREE.Vector3();

    export function lookAtFromZY(/*eye: THREE.Vector3, target: THREE.Vector3*/z: THREE.Vector3, up: THREE.Vector3) {

        z./*subVectors(eye, target).*/normalize();


        if (z.lengthSq() === 0) {
            z.z = 1;
        }
        x.crossVectors(up, z).normalize();

        if (x.lengthSq() === 0) {
            z.z += 0.0001;
            x.crossVectors(up, z).normalize();
        }
        y.crossVectors(z, x);

        let m = new THREE.Matrix4();
        m.makeBasis(x, y, z);
        return m;
    }

    export function worldToView(world: THREE.Matrix4) {
        let result = new THREE.Matrix4();
        result.copy(world);
        result.transpose();
        let xAxis = new THREE.Vector3();
        let yAxis = new THREE.Vector3();
        let zAxis = new THREE.Vector3();
        result.extractBasis(xAxis, yAxis, zAxis);
        result.identity();
        result.makeBasis(xAxis, zAxis, yAxis.negate());

        return result;
    }


}