import React from 'react';
import Head from 'next/head'
import Link from 'next/link';
import {isMobile } from 'react-device-detect';
import {FaPhone, FaMailBulk, FaSkype, FaGithub, FaDiscord, FaTelegram, FaLinkedin } from 'react-icons/fa';

import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import Header from '../components/header/Header';

const sendEmail = () => {    
  window.open("mailto:artemkolodiazhnyi7@gmail.com?subject=Contact");
};
class Home extends React.Component<{},{}> { 
  
  componentDidMount(){

    let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;
    let container:any, controls: OrbitControls, earth:THREE.Object3D, cube:THREE.Object3D;
    let group = new Array();
    let winWidth: number, winHeight: number;

    winWidth = window.innerWidth;
    winHeight = window.innerHeight;

    init();
    animate();

    function init(){
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2('#222', 0.001);

      camera = new THREE.PerspectiveCamera(40, winWidth/winHeight, 1, 2000);
      camera.position.z = 500;
      
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true });
      renderer.setSize(winWidth, winHeight);
      renderer.setClearColor('#222', 0);
      controls = new OrbitControls( camera, renderer.domElement );
      controls.maxDistance = 300;
      controls.minDistance = 10;
      // controls.autoRotate = true;
      // controls.autoRotateSpeed = 0.3;
      controls.update();
      
      container = document.getElementById('contact-canvas-container')
      container.appendChild( renderer.domElement )
      window.addEventListener( 'resize', onWindowResize );

      const ambientLight = new THREE.AmbientLight( 0xaaaaaa);
			scene.add( ambientLight );

			const light1 = new THREE.PointLight( 0x8888aa, 1, 0 );
			light1.position.set( -500, 1000, 1000 );
			scene.add( light1 );

			const light2 = new THREE.PointLight( 0x8888aa, 1, 0 );
			light2.position.set( 500, 1000, 1000 );
			scene.add( light2 );

      const cubegeometry = new THREE.BoxGeometry(1000, 1000, 1000);     
      
      const loadManager = new THREE.LoadingManager();
      const loader = new THREE.TextureLoader(loadManager);

      const materials = [
        new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: loader.load('assets/img/landing-page/px.jpg')}),
        new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: loader.load('assets/img/landing-page/nx.jpg')}),
        new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: loader.load('assets/img/landing-page/py.jpg')}),
        new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: loader.load('assets/img/landing-page/ny.jpg')}),
        new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: loader.load('assets/img/landing-page/pz.jpg')}),
        new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: loader.load('assets/img/landing-page/nz.jpg')}),
      ];
      loadManager.onLoad = () => {
        cube = new THREE.Mesh(cubegeometry, materials);
        scene.add(cube);
      };     
      loadManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, itemsTotal) => {
        const progress = itemsLoaded / itemsTotal;
        // progressBarElem.style.transform = `scaleX(${progress})`;
        console.log(progress)
      };

      const earthLoader = new GLTFLoader();
      earthLoader.load(
        'assets/models/world_earth_planet/scene.gltf', 
        function ( gltf ) {
          earth = gltf.scene;
          scene.add( earth );
          if (isMobile){
            earth.position.set(0,0,0)
            earth.scale.set(1.3,1.3,1.3)
          }
          else{
            earth.position.set(-100,0,0)
            earth.scale.set(1.6,1.6,1.6)
          }
        },
        // called while loading is progressing
        function ( xhr ) {      
          console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );      
        },
        // called when loading has errors
        function ( error ) {      
          console.log( 'An error happened' );      
        }
      )

      const geometry = new THREE.SphereGeometry( 1, 32, 16 );
      const material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness:0.5, roughness:0, emissive:0x333399 } );
      
      for ( let i = 0; i < 2000; i ++ ) {
        const x = THREE.MathUtils.randFloatSpread( 1000 );
        const y = THREE.MathUtils.randFloatSpread( 1000 );
        const z = THREE.MathUtils.randFloatSpread( 1000 );
        
        const sphere = new THREE.Mesh( geometry, material );
        sphere.position.set(x,y,z);
        
        group.push(sphere);
        scene.add(group[i])        
      }
    }
    
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function animate(){
      requestAnimationFrame(animate);
      if(earth) earth.rotateY(0.005)
      if(cube) cube.rotateY(0.002)
      var i = 2000;
      while(i--){        
        if(group[i].position.y < -500){
          group[i].position.y = 500;  
        }
        if(group[i].position.x>500) group[i].position.x = -500;  
        if(group[i].position.x<-500) group[i].position.x = 500; 
        if(group[i].position.z>500) group[i].position.z = -500;  
        if(group[i].position.z<-500) group[i].position.z = 500;  

        var p = new THREE.Vector3();
        p = group[i].position;
        group[i].position.y = p.y - 0.2;
        group[i].position.x = p.x + Math.pow(-1,i) * 0.02;
        group[i].position.z = p.z + Math.pow(-1,i) * 0.02;
      }      
      controls.update();
      render();
    }

    function render(){
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    }
  }

  render(){
    return (
      <>
        <Head>
          <title>My Portfolio</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <main className='flex items-center justify-center w-[100vw] h-[100vh] absolute top-0 left-0'>
          <div className='w-full h-full grid grid-cols-1 md:grid-cols-2'>
            <div className='hidden md:block'></div>
            <div className='flex items-center justify-center md:mr-20'>
              <div className='text-white text-base md:text-lg font-normal'>
                <div className='text-xl md:text-45 md:mt-8'>WHERE CAN YOU FIND ME?</div>
                <div className='my-20'>
                  <div style={{marginBottom:'20px'}}>GIVE ME A SHOUT</div>
                  <div className='text-lg md:text-36 font-medium'>
                    <Link href={'#'}>
                      <a className='hover:text-amber-500' onClick={()=>sendEmail()}>
                        <div className='' style={{display:"flex"}}><FaMailBulk/>&nbsp;&nbsp;artemkolodiazhnyi7@gmail.com</div>
                      </a>
                    </Link>
                  </div>
                  <div className='text-lg md:text-36 font-medium' style={{display:"flex"}}><FaPhone/>&nbsp;&nbsp;+380 660347865</div>
                </div>
                <div className='mt-20'>
                  <div>LET&apos;S BE FRIENDS!</div>                
                  <div className='text-white text-xl md:text-45 font-medium mt-2 flex justify-between items-center'>
                    <Link href={'https://join.skype.com/invite/iPk25SefEI0Y'}>
                      <a target={'_blank'} className='hover:text-amber-500'>
                        <FaSkype/>
                      </a>
                    </Link>
                    {/* <Link href={'https://www.linkedin.com/in/freddy-jose-garcia-2735a977/'}>
                      <a target={'_blank'} className='hover:text-amber-500'>
                        <FaLinkedin/>
                      </a>
                    </Link> */}
                    {/* <Link href={'https://www.upwork.com/freelancers/freddyjgs23'}>
                      <a target={'_blank'} className='hover:text-amber-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076l.008-.042c.207-1.143.849-3.06 2.839-3.06a2.705 2.705 0 0 1 2.703 2.703a2.707 2.707 0 0 1-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366c-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112a2.551 2.551 0 0 1-2.547 2.548a2.55 2.55 0 0 1-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303c2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109c3 0 5.439-2.452 5.439-5.45c0-3-2.439-5.439-5.439-5.439z"/></svg>
                      </a>
                    </Link> */}
                    <Link href={'https://github.com/WebMon9099'}>
                      <a target={'_blank'} className='hover:text-amber-500'>
                        <FaGithub/>
                      </a>
                    </Link>
                    {/* <Link href={'https://discord.gg/YgNKvera'}>
                      <a target={'_blank'} className='hover:text-amber-500'>
                        <FaDiscord/>
                      </a>
                    </Link> */}
                    <Link href={'https://t.me/MaximP9909'}>
                      <a target={'_blank'} className='hover:text-amber-500'>
                        <FaTelegram/>
                      </a>
                    </Link>
                  </div>                
                </div>
              </div>
            </div>
          </div>
        </main>
        <div id='contact-canvas-container' className='absolute w-[100vw] h-[100vh] top-0 left-0' style={{zIndex:'-100'}}></div>        
        <Header/>
      </>
    );
  }
}

export default Home;