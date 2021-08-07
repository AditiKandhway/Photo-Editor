console.log("Hello");
onload = function(){
    const frame = document.getElementById("frame");
    const context=frame.getContext("2d");
    const toolbar=document.getElementById("toolbar");
    const tools ={
        "upload": function()
        {
            const upload = document.createElement('input');
            upload.type="file";
            upload.click();
            upload.onchange=function()
            {
                const img=new Image();
                img.onload=()=>{
                    frame.width=img.width;
                    frame.height=img.height;
                    context.drawImage(img,0,0);
                };
                img.onerror=()=>{
                    console.log("The provided file cannot be uploaded as image media");
                };
                img.src=URL.createObjectURL(this.files[0]);
            };
        },
        "save":function()
        {
            const image=frame.toDataURL();
            const link=document.createElement('a');
            link.download="image.png";
            link.href=image;
            link.click();
        }
    };
    for(let button of toolbar.children){
        if(button.nodeName==="BUTTON") {
            button.onclick = function (event) {
                event.preventDefault();
                tools[this.id].call(this);
            }
        }
    }
}