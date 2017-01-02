
///<reference path="../Helpers/MathHelper.ts" />
///<reference path="./Billboard.ts" />

var loader = new THREE.TextureLoader();
var _texture = loader.load('textures/cloud10.png');
// var texture = THREE.ImageUtils.loadTexture('cloud10.png', null, animate);
_texture.magFilter = THREE.LinearMipMapLinearFilter;
_texture.minFilter = THREE.LinearMipMapLinearFilter;

var _fog = new THREE.Fog(0x4584b4, - 100, 3000);

THREE.ShaderLib['cloud'] = {
    uniforms: {

        "map": { value: _texture },
        "fogColor": { value: _fog.color },
        "fogNear": { value: _fog.near },
        "fogFar": { value: _fog.far },

    },

    vertexShader: `
        varying vec2 vUv;

        void main() {

        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

        }
    `,

    fragmentShader: `
        uniform sampler2D map;

        uniform vec3 fogColor;
        uniform float fogNear;
        uniform float fogFar;

        varying vec2 vUv;

        void main() {

        float depth = gl_FragCoord.z / gl_FragCoord.w;
        float fogFactor = smoothstep( fogNear, fogFar, depth );

        gl_FragColor = texture2D( map, vUv );
        gl_FragColor.w *= pow( gl_FragCoord.z, 20.0 );
        gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );

        }
    `
};



class Cloud {
    public constructor(scene: THREE.Scene) {
        var geometry = new THREE.DodecahedronGeometry(1000, 1);
        var material = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            shading: THREE.FlatShading,
            wireframe: false,
            side: THREE.DoubleSide
        });
        var cube = new THREE.Mesh(geometry, material);
        cube.scale.x = 2;
        cube.scale.y = 2;
        cube.position.set(0, 0, 10000);
        scene.add(cube);
    }
}

//class Cloud {
//    billboards: Billboard[] = [];
//    public constructor(scene: THREE.Scene) {

//        for (let i = 0; i < 100; ++i) {
//            let billboard = new Billboard(scene, "textures/cloud10.png");
//            billboard.setPsosition(MathHelper.randInRange(-10000, 10000), MathHelper.randInRange(-10000, 10000), 10000 + MathHelper.randInRange(-10, 10));
//            this.billboards.push(billboard);
//        }
//    }

//    public update(/*quaternion: THREE.Quaternion*/position: THREE.Vector3) {
//        for (let billboard of this.billboards) {
//            // billboard.quaternion(quaternion);
//            billboard.update(position);
//        }
//    }

//    public _update(/*quaternion: THREE.Quaternion*/matrix: THREE.Matrix4) {
//        for (let billboard of this.billboards) {
//            // billboard.quaternion(quaternion);
//            billboard._update(matrix);
//        }
//    }
//}



//class Cloud {
//    mesh: THREE.Mesh;
//    public constructor(scene: THREE.Scene) {
//        let geometry = new THREE.Geometry();

//        // instantiate a loader
//        //var loader = new THREE.TextureLoader();
//        //var texture = loader.load('cloud10.png');
//        //var texture = THREE.ImageUtils.loadTexture('cloud10.png', null, animate);
//        //texture.magFilter = THREE.LinearMipMapLinearFilter;
//        //texture.minFilter = THREE.LinearMipMapLinearFilter;

//        //var fog = new THREE.Fog(0x4584b4, - 100, 3000);


//        var cloudShader = THREE.ShaderLib["cloud"];


//        var material = new THREE.ShaderMaterial({
//            fragmentShader: cloudShader.fragmentShader,
//            vertexShader: cloudShader.vertexShader,
//            uniforms: cloudShader.uniforms,
//            depthWrite: false,
//            depthTest: false,
//            transparent: true
//        });


//        var plane = new THREE.Mesh(new THREE.PlaneGeometry(64, 64));
//        // plane.rotateX(Math.PI / 2);
//        for (var i = 0; i < 100; i++) {

//            plane.position.x = Math.random() * 1000 - 500;
//            plane.position.y = - Math.random() * Math.random() * 200 - 15;
//            plane.position.z = i;
//            // plane.rotateZ(Math.random() * Math.PI);

//            plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;

//            // THREE.GeometryUtils.merge(geometry, plane);
//            geometry.mergeMesh(plane)
//        }

//        this.mesh = new THREE.Mesh(geometry, material);
//        scene.add(this.mesh);
//        this.mesh.position.set(0, 0, 5000);
//    }
//}