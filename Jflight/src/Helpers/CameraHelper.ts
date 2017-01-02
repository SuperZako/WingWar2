namespace CameraHelper {
    let xAxis = new THREE.Vector3();
    let yAxis = new THREE.Vector3();
    let zAxis = new THREE.Vector3();
    let result = new THREE.Matrix4();


    //     機体座標系
    //           Z
    //           ^  X
    //           | /
    //           |/
    //     Y<----

    //     ワールド座標系
    //     Z
    //     ^  Y
    //     | /
    //     |/
    //     -------->X

    export function worldToView(world: THREE.Matrix4) {
        result.copy(world);
        result.transpose();

        result.extractBasis(xAxis, yAxis, zAxis);
        result.identity();
        result.makeBasis(xAxis, zAxis, yAxis.negate());

        return result;
    }


}