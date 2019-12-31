
$(document).ready(function() {
  var pro_fil;
  if ($("body").data("title") == "login_page") {
    document.querySelector("#sign_up").onclick = function() {
		event.preventDefault();
		
      var date = document.getElementById("dobsignup").value;
      var i,
        j = 0;
      var arr = new Array("", "", "");
      for (i = 0; i < date.length; i++) {
        if (date[i] == "-") {
          j += 1;
        } else arr[j] += date[i];
      }
      try {
		  
        let sign_up_data = {
          type: document.getElementById("val_equipfc").value,
          name: document.getElementById("usernamesignup").value,
          guardian_name: document.getElementById("guardiannamesignup").value,
          nic: document.getElementById("nicsignup").value,
          guardian_nic: document.getElementById("guardiannicsignup").value,

          address: document.getElementById("addresssignup").value,
          phone: document.getElementById("phonesignup").value,
          guardian_phone: document.getElementById("guardianphonesignup").value,
          date: arr[2],
          month: arr[1],
          year: arr[0],

          email: document.getElementById("emailsignup").value,
          guardian_email: document.getElementById("guardianemailsignup").value,
          qualification: document.getElementById("qualificationsignup").value,
          id: document.getElementById("nicsignup").value ,
          pwd: document.getElementById("passwordsignup").value,
          passwordsignup_confirm: document.getElementById(
            "passwordsignup_confirm"
          ).value
        };
		
        if( document.getElementById("passwordsignup").value == document.getElementById("passwordsignup_confirm").value ){
        $.ajax({
          url: "http://localhost:3000/user/signup",
          method: "POST",
          dataType: "json",
          crossDomain: true,
          withCredentials: true,
          data: sign_up_data,
          success: function(data) {
			alert("registered");
            console.log("login "+data);
			window.location.reload();
		//	window.location.href ="tologin";
          }
        });
		
		}else{
			alert("password and confirm password should be same")
		}
		
      } catch (error) {
        console.log(error);
      }
    };

    // profile data

    var id1, pass1, type1;
    document.querySelector("#log_in").onclick = function() {
      
      event.preventDefault();
	  id1 = document.getElementById("username").value;
      pass1 = document.getElementById("password").value;
      type1 = document.getElementById("type_login").value;
	  localStorage.setItem("type", JSON.stringify(type1));
      $.ajax({
        url: "http://localhost:3000/user/signin",
        type: "POST",
        dataType: "json",
        beforeSend: function(xhrObj) {
          xhrObj.setRequestHeader(
            "Access-Control-Allow-Headers",
            "x-requested-with"
          );
        },
        crossDomain: true,
        withCredentials: true,
        data: {
          id: id1,
          pwd: pass1,
          type: type1
        },
        success: function(data) {
          localStorage.setItem("dat", JSON.stringify(data));
          console.log(JSON.parse(localStorage.getItem("dat")));
          if (data.result == "Record not found") alert(data.result);
          else{ pro_fil = data;
		  window.location.href = "profile.html";}
		  
        }
      });
    };
  }

  if ($("body").data("title") == "profile_page") {
	var pro_file = JSON.parse(localStorage.getItem("dat"));
	var type = JSON.parse(localStorage.getItem("type"));
	if(type == "student" || type == 'parent'){
		document.getElementById("Add_Announcement").style.display = "none";
		document.getElementById("resources").style.display = "none";
		document.getElementById("lib").style.display = "none";
	
	}
	  
    // profile
    document.querySelector("#profile").onclick = function() {
   //   var pro_file = JSON.parse(localStorage.getItem("dat"));
      let myNode = document.getElementById("main");
      while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
      }
      console.log(pro_file);
      var tag =
        "<div><p><strong>" +
        "type :" +
        type +
        "</strong></p></div>";
      document.getElementById("main").insertAdjacentHTML("beforeend", tag);

      var tag =
        "<div><p><strong>" +
        "name :" +
        pro_file.result.name +
        "</strong></p></div>";
      document.getElementById("main").insertAdjacentHTML("beforeend", tag);


      var tag =
        "<div><p><strong>" +
        "Address :" +
        pro_file.result.address +
        "</strong></p></div>";
      document.getElementById("main").insertAdjacentHTML("beforeend", tag);

      var tag =
        "<div><p><strong>" +
        "Date :" +
        pro_file.result.date +
        "-" +
        pro_file.result.month +
        "-" +
        pro_file.result.year +
        "</strong></p></div>";
      //var tag = "<div><p><strong>" + pro_file.result.year + "</strong></p></div>";
      document.getElementById("main").insertAdjacentHTML("beforeend", tag);

      var tag = "<div><p><strong>User-id :  " + pro_file.result.nic + "</strong></p></div>";
      document.getElementById("main").insertAdjacentHTML("beforeend", tag);


      if (
        type == "teacher" ||
        type == "parent" ||
		type == 'admin'
      ) {
        var tag =
          "<div><p><strong> NIC : " + pro_file.result.nic + "</strong></p></div>";
        document.getElementById("main").insertAdjacentHTML("beforeend", tag);
		
		 var tag =
        "<div><p><strong> phone number : " + pro_file.result.phone + "</strong></p></div>";
      document.getElementById("main").insertAdjacentHTML("beforeend", tag);
	  
	    var tag =
        "<div><p><strong>" +
        "Email :" +
        pro_file.result.email +
        "</strong></p></div>";
      document.getElementById("main").insertAdjacentHTML("beforeend", tag);
      }

      if (type == "teacher") {
        var tag =
          "<div><p><strong> Qualication : " +
          pro_file.result.qualification +
          "</strong></p></div>";
        document.getElementById("main").insertAdjacentHTML("beforeend", tag);
      }
        console.log('a');
      if (type == "student") {
		   var tag =
        "<div><p><strong>" +
        "Email :" +
        pro_file.result.student_email +
        "</strong></p></div>";
      document.getElementById("main").insertAdjacentHTML("beforeend", tag);
		 
		 var tag =
        "<div><p><strong> phone number : " + pro_file.result.student_phone + "</strong></p></div>";
      document.getElementById("main").insertAdjacentHTML("beforeend", tag);
	  
        var tag =
          "<div><p><strong>guardian_name :  " +
          pro_file.result.guardian_name +
          "</strong></p></div>";
        document.getElementById("main").insertAdjacentHTML("beforeend", tag);

        var tag =
          "<div><p> <strong> guardian_phone : " +
          pro_file.result.guardian_phone +
          "</strong></p></div>";
        document.getElementById("main").insertAdjacentHTML("beforeend", tag);

        var tag =
          "<div><p><strong>guardian_email :  " +
          pro_file.result.guardian_email +
          "</strong></p></div>";
        document.getElementById("main").insertAdjacentHTML("beforeend", tag);

        var tag =
          "<div><p><strong>guardian_nic : " +
          pro_file.result.guardian_nic +
          "</strong></p></div>";
        document.getElementById("main").insertAdjacentHTML("beforeend", tag);
      }
    };
  }

  if ($("body").data("title") == "addResourc") {
	    var filee = "",URL = "",clik=0;
	  
	  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {
      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }
      var reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('list').insertBefore(span, null);
        };
      })(f);
      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
	
	 filee = this.value;
  }
  document.getElementById('files').addEventListener('change', handleFileSelect, false);
	
  
	  
	 
	
 
     
		  

    document.getElementById("submitResourse").onclick = async function() {
		
		event.preventDefault();

      if (document.getElementById("val_equipfc").value == "url")
        URL = document.getElementById("addAttachment").value;
 
      var s = {
        title: document.getElementById("tite_id").value,
        description: document.getElementById("description").value,
        grade: document.getElementById("grade").value,
        subject: document.getElementById("subject").value,
        teacher_id: document.getElementById("teacher_id").value,
        author: document.getElementById("author").value,
        file: filee,
        video_url: URL
      };
      console.log(s);
	  
	   var request = async () => {
      let promise = await $.ajax({
        url: "http://localhost:3000/resource/addResource",
        type: "POST",
        dataType: "json",
        beforeSend: function(xhrObj) {
        /*  xhrObj.setRequestHeader("Content-Type", "application/json");
          xhrObj.setRequestHeader("Accept", "application/json");*/
          xhrObj.setRequestHeader(
            "Access-Control-Allow-Headers",
            "x-requested-with"
          );
        },
        crossDomain: true,
        withCredentials: true,
        data: {
         title: document.getElementById("tite_id").value,
        description: document.getElementById("description").value,
        grade: document.getElementById("grade").value,
        subject: document.getElementById("subject").value,
        teacher_id: document.getElementById("teacher_id").value,
        author: document.getElementById("author").value,
        file: filee,
        video_url: URL
        },
        success: function(data) {
          alert("resource added");
          console.log(data.result);
		  window.location.reload();
        }
      });
    };
	request();
  };
	  
     
  
	
  }
  
  
    if ($("body").data("title") == "updateResource") {
		
		  var filee = "",UR = "";
		  
		  
		  
		    function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {
      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }
      var reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('list').insertBefore(span, null);
        };
      })(f);
      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
	
	 filee = this.value;
  }
  document.getElementById('files').addEventListener('change', handleFileSelect, false);
	
	

 
		  

    document.getElementById("submitResourse").onclick = async function() {
		  //UR = document.getElementById("addAttachment").value;
		  //console.log(UR);
      	event.preventDefault();
		
		   if (document.getElementById("val_equipfc").value == "url")
                UR = document.getElementById("addAttachment").value;
			
		
	  let request = async () => {
      let promise = await $.ajax({
        url: "http://localhost:3000/resource/updateResource",
        type: "POST",
        dataType: "json",
        beforeSend: function(xhrObj) {
        /*  xhrObj.setRequestHeader("Content-Type", "application/json");
          xhrObj.setRequestHeader("Accept", "application/json");*/
          xhrObj.setRequestHeader(
            "Access-Control-Allow-Headers",
            "x-requested-with"
          );
        },
        crossDomain: true,
        withCredentials: true,
        data: {
		 id:document.getElementById("id").value,
         title: document.getElementById("tite_id").value,
        description: document.getElementById("description").value,
        grade: document.getElementById("grade").value,
        subject: document.getElementById("subject").value,
        teacher_id: document.getElementById("teacher_id").value,
        author: document.getElementById("author").value,
        file: filee,
        video_url:document.getElementById("addAttachment").value ,
		time:document.getElementById("time").value,
		is_archive:document.getElementById("is_archive").value
        },
        success: function(data) {
		 console.log(data);
          alert("resource updated");
          console.log(data.result);
        }
      });
	 
    };
	
	 request();
  };
	  
 
	}
	
	
	
	// remove resources
		
	 if ($("body").data("title") == "removeResource") {
	
		 var da;
		 function y(){
			 alert("kkk");
		 }
		
		$.ajax({
        url: "http://localhost:3000/resource/library",
        type: "GET",
        dataType: "json",
        beforeSend: function(xhrObj) {
        /*  xhrObj.setRequestHeader("Content-Type", "application/json");
          xhrObj.setRequestHeader("Accept", "application/json");*/
          xhrObj.setRequestHeader(
            "Access-Control-Allow-Headers",
            "x-requested-with"
          );
        },
        crossDomain: true,
        withCredentials: true,
        success: function(data) {
		
			 console.log(data);
          alert("current resources");
		  
		  
		  let myNode = document.getElementById("main");
      while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
      }
	     var i=0,k;
	    
	
	  
	  while(i<data.resources.length){
		  k=i+1;
		   var t = 'b'+i;
		   var r = 'a'+i;
		   var e = '#a'+i;
		  if(i == 0){
	
	var tag = 	  '<div class="card"><div class="card-header btn btn-primary" id='+t+'>'+
'<h2 class="mb-0"><button class="btn btn-link" type="button" data-toggle="collapse" data-target='+e+' aria-expanded="true" aria-controls='+r+'>'+
          k + ') '+data.resources[i].title+'</button></h2></div>';

		  
	 tag =tag+"<div id="+r+" class='collapse show' aria-labelledby="+t+"  data-parent='#main'><div class='card-body'><p>author :<span style='color:gray'>"+ data.resources[i].author +"</span><br>description :<span style='color:gray'>"+data.resources[i].description +"</span><br>file :<span style='color:gray'>"+data.resources[i].file +"</span><br>"
	 +"subject :<span style='color:gray'>"+ data.resources[i].subject +"</span><br>"+
	 "title :<span style='color:gray'>"+ data.resources[i].title +"</span><br>"+"video_url :<span style='color:gray'>"+ data.resources[i].video_url +"</span><br>"+"grade :<span style='color:gray'>"+ data.resources[i].grade +"</span><br><br>"
	 + "<button id="+"D"+data.resources[i].id+" style='font-size:15px' class='btn btn-danger del'>del</button></p></div></div></div>";
	 
	 
		  }else{
			 
			  var tag = 	  '<div class="card"><div class="card-header btn btn-primary" id='+t+'>'+
'<h2 class="mb-0"><button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target='+e +' aria-expanded="false" aria-controls='+r+'>'+
          k + ')'+data.resources[i].title+'</button></h2></div>';

		
	 tag =tag+"<div id="+r+" class='collapse' aria-labelledby="+t+"  data-parent='#main'><div class='card-body'><p>author :<span style='color:gray'>"+ data.resources[i].author +"</span><br>description :<span style='color:gray'>"+data.resources[i].description +"</span><br>file :<span style='color:gray'>"+data.resources[i].file +"</span><br>"
	 +"subject :<span style='color:gray'>"+ data.resources[i].subject +"</span><br>"+
	 "title :<span style='color:gray'>"+ data.resources[i].title +"</span><br>"+"video_url :<span style='color:gray'>"+ data.resources[i].video_url +"</span><br>"+"grade :<span style='color:gray'>"+ data.resources[i].grade +"</span><br><br>"
	 + "<button id="+"D"+data.resources[i].id+" style='font-size:15px' class='btn btn-danger del'>del</button></p></div></div></div>";
	 
	  console.log(tag);
			  
			  
		  }
	 
	 		document.getElementById("main").insertAdjacentHTML("beforeend", tag);
			
		      var  idd = data.resources[i].id;
			 document.querySelector("#D"+data.resources[i].id).onclick =     function A() {
			     
       	event.preventDefault();
		var f = event.target.id.substring(1);
		event.target.parentNode.parentNode.parentNode.parentNode .style.display='none';
		//event.target.parentNode.parentNode
		
	  let request = async () => {
      let promise = await $.ajax({
        url: "http://localhost:3000/resource/removeResource",
        type: "POST",
        dataType: "json",
        beforeSend: function(xhrObj) {
        /*  xhrObj.setRequestHeader("Content-Type", "application/json");
          xhrObj.setRequestHeader("Accept", "application/json");*/
          xhrObj.setRequestHeader(
            "Access-Control-Allow-Headers",
            "x-requested-with"
          );
        },
        crossDomain: true,
        withCredentials: true,
        data: {
		 id:f
        },
        success: function(data) {
		 console.log(data);
          alert("resource removed");
          console.log(data.result);
        }
      });
	 
    };
	
	 request();
	  
		  };
		 i=i+1;
        }
		
		  
		
        }
		
	
      });
	  
		
		 
		
		 
		 
			 
	
		 
	 }
	 
	
	if ($("body").data("title") == "addAnnouncement") {
		
		var filee="";
			    function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {
      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }
      var reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('list').insertBefore(span, null);
        };
      })(f);
      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
	
	 filee = this.value;
  }
  document.getElementById('files').addEventListener('change', handleFileSelect, false);
  
	
		
		
		
		 document.getElementById("submitResourse").onclick = async function() {
		 
      	event.preventDefault();

	  let request = async () => {
      let promise = await $.ajax({
        url: "http://localhost:3000/announcement/addAnnouncement",
        type: "POST",
        dataType: "json",
        beforeSend: function(xhrObj) {
        /*  xhrObj.setRequestHeader("Content-Type", "application/json");
          xhrObj.setRequestHeader("Accept", "application/json");*/
          xhrObj.setRequestHeader(
            "Access-Control-Allow-Headers",
            "x-requested-with"
          );
        },
        crossDomain: true,
        withCredentials: true,
        data: {
		 due_date:document.getElementById("duedate").value,
		 grade_id:document.getElementById("Gradeid").value,
		 section_id:document.getElementById("Secid").value,
		 subject_id:document.getElementById("Subid").value,
		 teacher_id:document.getElementById("Teacherid").value,
		 title:document.getElementById("Tid").value,
		 description:document.getElementById("description").value,
		 marks:document.getElementById("marks").value,
		 attachment:filee,
		 suggestion:document.getElementById("suggestion").value,
		 subject:document.getElementById("subject").value,
		 section:document.getElementById("Section").value,
		 grade:document.getElementById("grade").value,
        },
        success: function(data) {
		 console.log(data);
          alert("announcement added");
          console.log(data.result);
        }
      });
	 
    };
	
	 request();
  };
	 
	 
	}
	
	if ($("body").data("title") == "myAnnouncement") {
		  var r = JSON.parse(localStorage.getItem("dat")).result;
		   var type = JSON.parse(localStorage.getItem("type"));
		   console.log(r);
	if(type == "student" || type == 'parent'){
		document.getElementById("Add_Announcement").style.display = "none";
		document.getElementById("resources").style.display = "none";
		document.getElementById("lib").style.display = "none";
	
	}
		    console.log(r.nic);
		// document.getElementById("submitResourse").onclick = async function() {
		 
      	//event.preventDefault();
		
	  let request = async () => {
      let promise = await $.ajax({
        url: "http://localhost:3000/announcement/announcements",
        type: "GET",
        dataType: "json",
        beforeSend: function(xhrObj) {
        /*  xhrObj.setRequestHeader("Content-Type", "application/json");
          xhrObj.setRequestHeader("Accept", "application/json");*/
          xhrObj.setRequestHeader(
            "Access-Control-Allow-Headers",
            "x-requested-with"
          );
        },
        crossDomain: true,
        withCredentials: true,
		data:{
			id:r.nic
		},
        success: function(data) {
		 console.log(data);
		 
		 
		 // get
		 let myNode = document.getElementById("main");
      while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
      }
	  
	   var j=0,k;
	
	if( data.resources.length == 0){
    k = '<p style="white-space: nowrap; font-family:Sans Serif; display:inline">No Announcement </p>';
	document.getElementById("main").insertAdjacentHTML("beforeend", k);
	}	
	  while(j< data.resources.length){
		   k=j+1;
		   var t = 'b'+j;
		   var r = 'a'+j;
		   var e = '#a'+j;
		  
		  if(j ==0 ){
		  var tag = 	  '<div  style=" white-space: nowrap; font-family:Sans Serif"  class="card"><div class="card-header btn btn-primary" id='+t+'>'+
'<h2 class="mb-0"><button class="btn btn-link" type="button" data-toggle="collapse" data-target='+e+' aria-expanded="true" aria-controls='+r+'>'+
          k + ') '+data.resources[j].title+'</button></h2></div>';
		  
		  
	  tag =tag+"<div id="+r+" class='collapse show' aria-labelledby="+t+"  data-parent='#main'><div class='card-body'><p>type :   <span style='color:gray;  font-size:20px'>"+ data.resources[j].type +"</span><br><br> due-date :<span style='color:gray;  font-size:20px'> "+data.resources[j].due_date +"</span><br><br>  description :<span style='color:gray;  font-size:20px'> "+data.resources[j].description +"</span><br><br>"+
	 " marks : <span style='color:gray; font-size:20px'>"+ data.resources[j].marks +"</span><br>"+" subject :<span style='color:gray;  font-size:20px'> "+ data.resources[j].subject +"</span><br>"+" time : <span style='color:gray;  font-size:20px'>"+ data.resources[j].time +"</span><br>"+
	 " title : <span style='color:gray;  font-size:20px'>"+ data.resources[j].title +"</span><br>"+" attachment : <span style='color:gray;  font-size:20px'>"+ data.resources[j].attachment +"</span><br><br>";
	 
		  }
		  else{
			  
			  	  var tag = 	  '<div  style="font-family:Sans Serif"  class="card"><div class="card-header btn btn-primary" id='+t+'>'+
'<h2 class="mb-0"><button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target='+e+' aria-expanded="false" aria-controls='+r+'>'+
          k + ') '+data.resources[j].title+'</button></h2></div>';
		  
		  
	  tag =tag+"<div id="+r+" class='collapse' aria-labelledby="+t+"  data-parent='#main'><div class='card-body'><p>type :   <span style='color:gray;  font-size:20px'>"+ data.resources[j].type +"</span><br><br> due-date :<span style='color:gray;  font-size:20px'> "+data.resources[j].due_date +"</span><br><br>  description :<span style='color:gray;  font-size:20px'> "+data.resources[j].description +"</span><br><br>"+
	 " marks : <span style='color:gray; font-size:20px'>"+ data.resources[j].marks +"</span><br>"+" subject :<span style='color:gray;  font-size:20px'> "+ data.resources[j].subject +"</span><br>"+" time : <span style='color:gray;  font-size:20px'>"+ data.resources[j].time +"</span><br>"+
	 " title : <span style='color:gray;  font-size:20px'>"+ data.resources[j].title +"</span><br>"+" attachment : <span style='color:gray;  font-size:20px'>"+ data.resources[j].attachment +"</span><br><br>";
	 
			  
			  
		  }
	 var grade="  grades :<span style='color:gray;  font-size:20px'> ",i=0;
	 
	 if (data.resources[j].suggestion instanceof Array ){
	 while (i<data.resources[j].grade.length){
		 grade=grade.concat(data.resources[j].grade[i]+" ");
		 i=i+1;
	 }}else{
		  grade=grade.concat(data.resources[j].grade);
	 }
	 grade=grade+"</span><br><br>";
	 
	  var section=" section :  <span style='color:gray;  font-size:20px'>";  i=0;
	  
	   if (data.resources[j].suggestion instanceof Array ){
	 while (i<data.resources[j].section.length){
		 section=section.concat(data.resources[j].section[i]+" , ");
		 i=i+1;
	   }}else{
		    section=section.concat(data.resources[j].section);
	   }
	 section=section+"</span><br><br>";
	 
	   var sug=" suggestion :<span style='color:gray;  font-size:20px'>";  i=0;
	    if (data.resources[j].suggestion instanceof Array ){
	 while (i<data.resources[j].suggestion.length){
		 sug=sug.concat(data.resources[j].suggestion[i]+", ");
		 i=i+1;
		}}else{
			 sug=sug.concat(data.resources[j].suggestion);
			
		}
	 sug=sug+"</span><br><br>";
	 
	 
	  var sub_id="subject-id : <span style='color:gray;  font-size:20px'>";  i=0;
	  if (data.resources[j].subject_id instanceof Array ){
	 while (i<data.resources[j].subject_id.length){
		 sub_id=sub_id.concat(data.resources[j].subject_id[i]+", ");
		 i=i+1;
	  }}else{
		  
		   sub_id=sub_id.concat(data.resources[j].subject_id);
	  }
	 sub_id=sub_id+"</span></p></div></div></div>";
	 
	 
	 
	 tag=tag+grade+section+sug+sub_id;
	 		document.getElementById("main").insertAdjacentHTML("beforeend", tag);
			j=j+1;
	  }
        }
      });
	 
    };
	
	 request();
 
		// };
	}
	
	
	if ($("body").data("title") == "myLibrary") {
		 
		var obj_prf = JSON.parse(localStorage.getItem("dat")).result;
		var type = JSON.parse(localStorage.getItem("type"));
	    var URL;
	if(type == "student" || type == 'parent'){
		document.getElementById("Add_Announcement").style.display = "none";
		document.getElementById("resources").style.display = "none";
		document.getElementById("lib").style.display = "none";
	    URL="http://localhost:3000/resource/library/filter";
	}
	else{
		URL="http://localhost:3000/resource/library/myLibrary/filter";
	}
		
		 document.getElementById("submitResourse").onclick = async function() {
		 
      	event.preventDefault();
		
		
	  let request = async () => {
      let promise = await $.ajax({
        url:URL ,
        type: "POST",
        dataType: "json",
        beforeSend: function(xhrObj) {
        /*  xhrObj.setRequestHeader("Content-Type", "application/json");
          xhrObj.setRequestHeader("Accept", "application/json");*/
          xhrObj.setRequestHeader(
            "Access-Control-Allow-Headers",
            "x-requested-with"
          );
        },
        crossDomain: true,
        withCredentials: true,
        data: {
		 time:document.getElementById("time").value,
		 id:obj_prf.nic,
		 subject:[document.getElementById("subject").value],
		 grade:document.getElementById("grade").value
        },
        success: function(data) {
		 console.log(data);
          //alert("posted");

		  	  let myNode = document.getElementById("main");
      while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
      }
	     var i=0;
	    
	   var tag = 	"<tr> <th scope='col'>author</th> <th scope='col'>description</th> <th scope='col'>file</th><th scope='col'>id</th><th scope='col'>subject</th><th scope='col'>time</th><th scope='col'>title</th><th scope='col'>video_url</th><th scope='col'>Class</th><th scope='col'>is_archive</th><th scope='col'>tags</th></tr>" 
	  document.getElementById("main").insertAdjacentHTML("beforeend", tag);
	  
	  while(i<data.resources.length){
	 var tag = "<tr >  <td>"+ data.resources[i].author +"</td><td>"+data.resources[i].description +"</td> <td>"+data.resources[i].file +"</td>"+
	 "<td>"+ data.resources[i].id +"</td>"+"<td>"+ data.resources[i].subject +"</td>"+"<td>"+ data.resources[i].time +"</td>"+
	 "<td>"+ data.resources[i].title +"</td>"+"<td>"+ data.resources[i].video_url +"</td>"+"<td>"+ data.resources[i].grade +"</td>"+"<td>"+ data.resources[i].is_archive +"</td>"+"<td>"+ data.resources[i].tags +"</td></tr>"
	 
	 		document.getElementById("main").insertAdjacentHTML("beforeend", tag);
			
		 i=i+1;
        }
		
		
		}
		 
      });
	 
    };
	
	 request();
  };
		
	
		
	}
	
	
	
	
	if ($("body").data("title") == "Library") {
		var r = JSON.parse(localStorage.getItem("dat")).result;
		    console.log(r.nic);
	var type = JSON.parse(localStorage.getItem("type"));
		
			
		//document.getElementById("submitResourse").onclick = async function() {
		 
      //	event.preventDefault();
	  let request = async () => {
      let promise = await $.ajax({
        url: "http://localhost:3000/resource/library/myLibrary",
        type: "GET",
        dataType: "json",
        beforeSend: function(xhrObj) {
        /*  xhrObj.setRequestHeader("Content-Type", "application/json");
          xhrObj.setRequestHeader("Accept", "application/json");*/
          xhrObj.setRequestHeader(
            "Access-Control-Allow-Headers",
            "x-requested-with"
          );
        },
        crossDomain: true,
        withCredentials: true,
        data: {
		 id:r.nic
        },
        success: function(data) {
		 console.log(data);
		  
		  
		  let myNode = document.getElementById("main");
      while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
      }
	     var i=0;
	    
	   var tag = 	"<tr> <th scope='col'>author</th> <th scope='col'>description</th> <th scope='col'>file</th><th scope='col'>id</th><th scope='col'>subject</th><th scope='col'>time</th><th scope='col'>title</th><th scope='col'>video_url</th><th scope='col'>Class</th><th scope='col'>is_archive</th><th scope='col'>tags</th></tr>" 
	  document.getElementById("main").insertAdjacentHTML("beforeend", tag);
	  
	  while(i<data.resources.length){
	 var tag = "<tr >  <td>"+ data.resources[i].author +"</td><td>"+data.resources[i].description +"</td> <td>"+data.resources[i].file +"</td>"+
	 "<td>"+ data.resources[i].id +"</td>"+"<td>"+ data.resources[i].subject +"</td>"+"<td>"+ data.resources[i].time +"</td>"+
	 "<td>"+ data.resources[i].title +"</td>"+"<td>"+ data.resources[i].video_url +"</td>"+"<td>"+ data.resources[i].grade +"</td>"+"<td>"+ data.resources[i].is_archive +"</td>"+"<td>"+ data.resources[i].tags +"</td></tr>"
	 
	 		document.getElementById("main").insertAdjacentHTML("beforeend", tag);
			
		 i=i+1;
        }
		
		  
		  
        }
      });
	 
    };
	
	 request();
  //};
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	}
	
		if ($("body").data("title") == "res") {
		 
		var obj_prf = JSON.parse(localStorage.getItem("dat")).result;
		var type = JSON.parse(localStorage.getItem("type"));
	    var URL;
	if(type == "student" || type == 'parent'){
		document.getElementById("Add_Announcement").style.display = "none";
		document.getElementById("resources").style.display = "none";
		document.getElementById("lib").style.display = "none";
	}
		
	//	 document.getElementById("submitResourse").onclick = async function() {
		 
      //	event.preventDefault();
		
		
	  let request = async () => {
      let promise = await $.ajax({
        url:"http://localhost:3000/resource/library",
        type: "GET",
        dataType: "json",
        beforeSend: function(xhrObj) {
        /*  xhrObj.setRequestHeader("Content-Type", "application/json");
          xhrObj.setRequestHeader("Accept", "application/json");*/
          xhrObj.setRequestHeader(
            "Access-Control-Allow-Headers",
            "x-requested-with"
          );
        },
        crossDomain: true,
        withCredentials: true,
        data: {

        },
        success: function(data) {
		 console.log(data);
          //alert("posted");

	/*		  let myNode = document.getElementById("main");
      while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
      }
	     var i=0;
	    
	   var tag = 	"<tr> <th scope='col'>author</th> <th scope='col'>description</th> <th scope='col'>file</th><th scope='col'>id</th><th scope='col'>subject</th><th scope='col'>time</th><th scope='col'>title</th><th scope='col'>video_url</th><th scope='col'>Class</th><th scope='col'>is_archive</th><th scope='col'>tags</th></tr>" 
	  document.getElementById("main").insertAdjacentHTML("beforeend", tag);
	  
	  while(i<data.resources.length){
	 var tag = "<tr >  <td>"+ data.resources[i].author +"</td><td>"+data.resources[i].description +"</td> <td>"+data.resources[i].file +"</td>"+
	 "<td>"+ data.resources[i].id +"</td>"+"<td>"+ data.resources[i].subject +"</td>"+"<td>"+ data.resources[i].time +"</td>"+
	 "<td>"+ data.resources[i].title +"</td>"+"<td>"+ data.resources[i].video_url +"</td>"+"<td>"+ data.resources[i].grade +"</td>"+"<td>"+ data.resources[i].is_archive +"</td>"+"<td>"+ data.resources[i].tags +"</td></tr>"
	 
	 		document.getElementById("main").insertAdjacentHTML("beforeend", tag);
			
		 i=i+1;
        }
		*/
		
		 let myNode = document.getElementById("main");
      while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
      }
	  
	   var j=0,k;
	
	if( data.resources.length == 0){
    k = '<p style="white-space: nowrap; font-family:Sans Serif; display:inline">No Announcement </p>';
	document.getElementById("main").insertAdjacentHTML("beforeend", k);
	}	
	  while(j< data.resources.length){
		   k=j+1;
		   var t = 'b'+j;
		   var r = 'a'+j;
		   var e = '#a'+j;
		  
		  if(j ==0 ){
		  var tag = 	  '<div  style=" white-space: nowrap; font-family:Sans Serif"  class="card"><div class="card-header btn btn-primary" id='+t+'>'+
'<h2 class="mb-0"><button class="btn btn-link" type="button" data-toggle="collapse" data-target='+e+' aria-expanded="true" aria-controls='+r+'>'+
          k + ') '+data.resources[j].title+'</button></h2></div>';
		  
		  
	  tag =tag+"<div id="+r+" class='collapse show' aria-labelledby="+t+"  data-parent='#main'><div class='card-body'><p>author :   <span style='color:gray;  font-size:20px'>"+ data.resources[j].author +"</span><br><br> Grade :<span style='color:gray;  font-size:20px'> "+data.resources[j].grade +"</span><br><br>  description :<span style='color:gray;  font-size:20px'> "+data.resources[j].description +"</span><br><br>"+
	 " time : <span style='color:gray; font-size:20px'>"+ data.resources[j].time +"</span><br>"+" subject :<span style='color:gray;  font-size:20px'> "+ data.resources[j].subject +"</span><br>"+" time : <span style='color:gray;  font-size:20px'>"+ data.resources[j].time +"</span><br>"+
	 " title : <span style='color:gray;  font-size:20px'>"+ data.resources[j].title +"</span><br>"+" archive :<span style='color:gray;  font-size:20px'> "+ data.resources[j].is_archive +"</span><br>"+" file :<span style='color:gray;  font-size:20px'> "+ data.resources[j].file +"</span><br>"+" video url : <span style='color:gray;  font-size:20px'>"+ data.resources[j].video_url +"</span><br><br>";
	 
		  }
		  else{
			  
			  	  var tag = 	  '<div  style="font-family:Sans Serif"  class="card"><div class="card-header btn btn-primary" id='+t+'>'+
'<h2 class="mb-0"><button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target='+e+' aria-expanded="false" aria-controls='+r+'>'+
          k + ') '+data.resources[j].title+'</button></h2></div>';
		  
		 
			  
      tag =tag+"<div id="+r+" class='collapse' aria-labelledby="+t+"  data-parent='#main'><div class='card-body'><p>author :   <span style='color:gray;  font-size:20px'>"+ data.resources[j].author +"</span><br><br> Grade :<span style='color:gray;  font-size:20px'> "+data.resources[j].grade +"</span><br><br>  description :<span style='color:gray;  font-size:20px'> "+data.resources[j].description +"</span><br><br>"+
	 " time : <span style='color:gray; font-size:20px'>"+ data.resources[j].time +"</span><br>"+" subject :<span style='color:gray;  font-size:20px'> "+ data.resources[j].subject +"</span><br>"+" time : <span style='color:gray;  font-size:20px'>"+ data.resources[j].time +"</span><br>"+
	 " title : <span style='color:gray;  font-size:20px'>"+ data.resources[j].title +"</span><br>"+" archive :<span style='color:gray;  font-size:20px'> "+ data.resources[j].is_archive +"</span><br>"+" file :<span style='color:gray;  font-size:20px'> "+ data.resources[j].file +"</span><br>"+" video url : <span style='color:gray;  font-size:20px'>"+ data.resources[j].video_url +"</span><br><br>";
	   
			  
		  }
		
				document.getElementById("main").insertAdjacentHTML("beforeend", tag);
			j=j+1;
	  }
		
		
		
		}
		 
      });
	 
    };
	
	 request();
  };
		
	
		
	//}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
		
	
	
	
	
	
	
	if ($("body").data("title") == "recom") {
		
		
		
		document.getElementById("submit").onclick = async function() {
		 
      	event.preventDefault();
		
		console.log("gggg");
		  let request = async () => {
      let promise = await $.ajax({
        url: "http://localhost:3000/institute/instDetails/filter",
        type: "POST",
        dataType: "json",
        beforeSend: function(xhrObj) {
        /*  xhrObj.setRequestHeader("Content-Type", "application/json");
          xhrObj.setRequestHeader("Accept", "application/json");*/
          xhrObj.setRequestHeader(
            "Access-Control-Allow-Headers",
            "x-requested-with"
          );
        },
        crossDomain: true,
        withCredentials: true,
        data: {
		loc: document.getElementById("loc").value,
		fee: document.getElementById("fee").value,
		ground:document.getElementById("ground").value,
		lib:document.getElementById("lib").value,
		phd:document.getElementById("phd").value,
        },
        success: function(data) {
		 console.log(data);
		  
		 
		/*  let myNode = document.getElementById("main");
      while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
      }
	     var i=0;
	    
	   var tag = 	"<tr> <th scope='col'>author</th> <th scope='col'>description</th> <th scope='col'>file</th><th scope='col'>id</th><th scope='col'>subject</th><th scope='col'>time</th><th scope='col'>title</th><th scope='col'>video_url</th><th scope='col'>Class</th><th scope='col'>is_archive</th><th scope='col'>tags</th></tr>" 
	  document.getElementById("main").insertAdjacentHTML("beforeend", tag);
	  
	  while(i<data.resources.length){
	 var tag = "<tr >  <td>"+ data.resources[i].author +"</td><td>"+data.resources[i].description +"</td> <td>"+data.resources[i].file +"</td>"+
	 "<td>"+ data.resources[i].id +"</td>"+"<td>"+ data.resources[i].subject +"</td>"+"<td>"+ data.resources[i].time +"</td>"+
	 "<td>"+ data.resources[i].title +"</td>"+"<td>"+ data.resources[i].video_url +"</td>"+"<td>"+ data.resources[i].grade +"</td>"+"<td>"+ data.resources[i].is_archive +"</td>"+"<td>"+ data.resources[i].tags +"</td></tr>"
	 
	 		document.getElementById("main").insertAdjacentHTML("beforeend", tag);
			
		 i=i+1;
        }
		
		  */
		  
		  		 // get
		 let myNode = document.getElementById("main");
      while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
      }
	  
	   var j=0,k;
	
	if( data.resources.length == 0){
    k = '<p style="white-space: nowrap; font-family:Sans Serif; display:inline">No Announcement </p>';
	document.getElementById("main").insertAdjacentHTML("beforeend", k);
	}	
	  while(j< data.resources.length){
		   k=j+1;
		   var t = 'b'+j;
		   var r = 'a'+j;
		   var e = '#a'+j;
		  
		  if(j ==0 ){
		  var tag = 	  '<div  style=" white-space: nowrap; font-family:Sans Serif"  class="card"><div class="card-header btn btn-primary" id='+t+'>'+
'<h2 class="mb-0"><button class="btn btn-link" type="button" data-toggle="collapse" data-target='+e+' aria-expanded="true" aria-controls='+r+'>'+
          k + ') '+data.resources[j].name+'</button></h2></div>';
		  
		  
	  tag =tag+"<div id="+r+" class='collapse show' aria-labelledby="+t+"  data-parent='#main'><div class='card-body'><p>location :   <span style='color:gray;  font-size:20px'>"+ data.resources[j].location +"</span><br><br> library :<span style='color:gray;  font-size:20px'> "+data.resources[j].library +"</span><br><br>  PHD :<span style='color:gray;  font-size:20px'> "+data.resources[j].phd +"</span><br><br>"+
	 " fee : <span style='color:gray; font-size:20px'>"+ data.resources[j].fee +"</span><br>"+" Name :<span style='color:gray;  font-size:20px'> "+ data.resources[j].name +"<br><br>";
	 
		  }
		  else{
			  
			  	  var tag = 	  '<div  style="font-family:Sans Serif"  class="card"><div class="card-header btn btn-primary" id='+t+'>'+
'<h2 class="mb-0"><button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target='+e+' aria-expanded="false" aria-controls='+r+'>'+
          k + ') '+data.resources[j].name+'</button></h2></div>';
		  
		  
	  tag =tag+"<div id="+r+" class='collapse' aria-labelledby="+t+"  data-parent='#main'><div class='card-body'><p>location :   <span style='color:gray;  font-size:20px'>"+ data.resources[j].location +"</span><br><br> library :<span style='color:gray;  font-size:20px'> "+data.resources[j].library +"</span><br><br>  PHD :<span style='color:gray;  font-size:20px'> "+data.resources[j].phd +"</span><br><br>"+
	 " fee : <span style='color:gray; font-size:20px'>"+ data.resources[j].fee +"</span><br>"+" Name :<span style='color:gray;  font-size:20px'> "+ data.resources[j].name +"</span><br><br>";
	 
			  
			  
		  }
		  
		  document.getElementById("main").insertAdjacentHTML("beforeend", tag);
		   j=j+1;
        }
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
        }
      });
	 
    };
	
	 request();
		
		
		
		
		}
		
		
		
		
		
		
		
	}
	
	
	 
	 
	 
	 
	 
	 
	 
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	  
});

/* .then(function(response) {
		  console.log (response.json());})*/
/*
	    <link rel="shortcut icon" href="../favicon.ico">
	  
	  */
