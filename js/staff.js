$(document).ready(function(){
  if(window.location.pathname.includes("/index.html") && window.location.search.includes("?id=")){
    const id = window.location.search.replace('?id=','');
    axios.get('../api/staff.json')
     .then(response => {

      const staffs = response.data;
      const staff = staffs.filter((value)=>{
        return value.id === id;
      });
  
      if(typeof staff === "object" && staff.length > 0){
        document.getElementById("name").innerHTML = staff[0].name;
        document.getElementById("position").innerHTML = staff[0].position;
        document.getElementById("linkedin").href=staff[0].linkedin;
        document.getElementById("profile").src = `assets/staffs/${staff[0].profile}`;
        document.title = `${staff[0].name}, IC.SG - Staff`;
        $('head').append( '<meta property="og:image" content="' +  `${staff[0].profile}` + '">' );
        // $('meta[property=og\\:image]').attr('content', `https://www.ic.sg/assets/staffs/${staff[0].profile}`);
        // let imageTypeIndex = staff[0].profile.lastIndexOf('.')
        // const typeImage = staff[0].profile.slice(imageTypeIndex + 1)
        // $('meta[property=og\\:image\\:type]').attr('content', `image/${typeImage}`);

        if(staff[0].leaveDate){
          document.getElementById("container-bio").classList.add("d-none");
          document.getElementById("container-leave").innerHTML = `${staff[0].name} has left the organization since ${staff[0].leaveDate}.`;
          document.getElementById("profile-container").classList.add("profile-img-leave");
          $('meta[property=og\\:description]').attr('content', `${staff[0].name} has left the organization since ${staff[0].leaveDate}.`);
        } else{
          $('meta[property=og\\:description]').attr('content', staff[0].biography);
          document.getElementById("container-leave").classList.add("d-none");
          document.getElementById("biography").innerHTML = staff[0].biography;
          document.getElementById("join").innerHTML = staff[0].joinDate;
      
          staff[0].skills.forEach((skill)=>{
            const skillElement = document.createElement("div");
            skillElement.innerHTML = skill;
            skillElement.classList.add("skill-tag-item")
            document.getElementById("skills").appendChild(skillElement)
          })
        }
      }else{
        window.location.replace('https://ic.sg')
      }    
    })
     .catch(error => console.error(error));    
  }else{
    // window.location.replace('https://ic.sg')
  }
});