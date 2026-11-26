// Local, opt-in phone attention estimation. No images or landmarks are retained.
export class FocusVision {
 constructor(video,canvas,onSample){Object.assign(this,{video,canvas,onSample,active:false,phone:null,feature:null,screen:null,phoneGaze:null,handNear:false});this.generation=0}
 async start(){
  if(this.active)return;
  const token=++this.generation;this.active=true;
  try{
   const stream=await navigator.mediaDevices.getUserMedia({audio:false,video:{width:{ideal:640},height:{ideal:480},facingMode:'user'}});
   if(token!==this.generation){stream.getTracks().forEach(t=>t.stop());return}
   this.stream=stream;this.video.srcObject=stream;await this.video.play();
   const {FilesetResolver,FaceLandmarker,ObjectDetector,HandLandmarker}=await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22-rc.20250304/+esm');
   const files=await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22-rc.20250304/wasm');
   if(token!==this.generation)return;
   if(!this.face)this.face=await FaceLandmarker.createFromOptions(files,{baseOptions:{modelAssetPath:'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',delegate:'CPU'},runningMode:'VIDEO',numFaces:1});
   if(!this.detector)this.detector=await ObjectDetector.createFromOptions(files,{baseOptions:{modelAssetPath:'https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/int8/1/efficientdet_lite0.tflite',delegate:'CPU'},runningMode:'VIDEO',scoreThreshold:0.25,categoryAllowlist:['cell phone']});
   this.files=files;this.HandLandmarker=HandLandmarker;
   if(token!==this.generation)return;
   this.lastFace=this.lastObject=this.lastHand=0;this.lastVideo=-1;this.loop();
  }catch(e){if(token===this.generation)this.stop();throw e}
 }
 stop(){this.generation++;this.active=false;cancelAnimationFrame(this.raf);this.stream?.getTracks().forEach(t=>t.stop());this.stream=null;this.video.srcObject=null;this.feature=null;this.phone=null;this.handNear=false;this.canvas.getContext('2d').clearRect(0,0,this.canvas.width,this.canvas.height)}
 async setHand(enabled){this.useHand=enabled;if(enabled&&!this.hand&&this.files){this.hand=await this.HandLandmarker.createFromOptions(this.files,{baseOptions:{modelAssetPath:'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',delegate:'CPU'},runningMode:'VIDEO',numHands:2})}}
 extract(p){if(!p||p.length<478)return null;const eye=(a,b,u,d,i)=>{const w=Math.hypot(p[a].x-p[b].x,p[a].y-p[b].y)||.001;return [(p[i].x-(p[a].x+p[b].x)/2)/w,(p[i].y-(p[u].y+p[d].y)/2)/w]};const a=eye(33,133,159,145,468),b=eye(362,263,386,374,473);const mid={x:(p[33].x+p[263].x)/2,y:(p[33].y+p[263].y)/2};const w=Math.hypot(p[33].x-p[263].x,p[33].y-p[263].y)||.001;return [(a[0]+b[0])/2,(a[1]+b[1])/2,(p[1].x-mid.x)/w,(p[1].y-mid.y)/w]}
 distance(a,b){return Math.hypot(...a.map((x,i)=>(x-b[i])*(i<2?1:0.8)))}
 calibrate(which){if(!this.feature||performance.now()-this.lastFace>500)throw Error('Face not visible.');if(which==='phone'&&!this.phone)throw Error('Hold the phone where the camera can detect it.');this[which==='phone'?'phoneGaze':'screen']=[...this.feature];return this.screen&&this.phoneGaze?this.distance(this.screen,this.phoneGaze):null}
 loop(){if(!this.active)return;const t=performance.now();try{
 const v=this.video,w=v.videoWidth,h=v.videoHeight;if(w&&h&&v.readyState>=2&&v.currentTime!==this.lastVideo){this.lastVideo=v.currentTime;
 if(t-this.lastFace>=80){this.lastFace=t;this.feature=this.extract(this.face.detectForVideo(v,t).faceLandmarks[0])}
 if(t-this.lastObject>=1000/(this.fps||3)){this.lastObject=t;const ds=this.detector.detectForVideo(v,t).detections;const d=ds.filter(x=>x.categories[0]?.score>=(this.confidence||.5)).sort((a,b)=>b.categories[0].score-a.categories[0].score)[0];this.phone=d?{...d.boundingBox,score:d.categories[0].score}:null}
 if(this.useHand&&this.hand&&t-this.lastHand>=200){this.lastHand=t;const b=this.phone;this.handNear=!!b&&this.hand.detectForVideo(v,t).landmarks.some(p=>p.some(q=>q.x*w>b.originX-30&&q.x*w<b.originX+b.width+30&&q.y*h>b.originY-30&&q.y*h<b.originY+b.height+30))}
 const calibrated=!!(this.screen&&this.phoneGaze&&this.distance(this.screen,this.phoneGaze)>.035);
 let match=false;if(calibrated&&this.feature&&this.phone){const ds=this.distance(this.feature,this.screen),dp=this.distance(this.feature,this.phoneGaze);match=dp<ds*.8&&dp<Math.max(.055,this.distance(this.screen,this.phoneGaze)*.8)}
 if(this.canvas.width!==w||this.canvas.height!==h){this.canvas.width=w;this.canvas.height=h}const c=this.canvas.getContext('2d');c.clearRect(0,0,w,h);if(this.phone){const b=this.phone;c.strokeStyle=match?'#f0ad55':'#66e39a';c.lineWidth=3;c.strokeRect(b.originX,b.originY,b.width,b.height);c.fillStyle=c.strokeStyle;c.font='16px system-ui';c.fillText('Phone '+Math.round(b.score*100)+'%',b.originX,Math.max(18,b.originY-5))}
 this.onSample({face:!!this.feature,phone:!!this.phone,match,calibrated,hand:this.useHand&&this.handNear,t});
 }
 }catch(e){this.stop();this.onSample({error:e.message});return}this.raf=requestAnimationFrame(()=>this.loop())}
}
