<?php

/**
 * Template Name:register_vet
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */
get_header();
session_start();

if('POST' !== $_SERVER['REQUEST_METHOD'])
{

$_SESSION['flag']=false;//this flag will be true when entry will be done
$_SESSION['o1flag']=false;//this flag will true when other textfield will appear
$_SESSION['count']=false;//this flag will be true when either location select from combobox or new location entered
$_SESSION['oflag']=false;//this flag will be true when we press other button
$_SESSION['o2flag']=false;//this flag will be true when othertext field is present and not empty
//$_SESSION['o3flag']=false;//this flag will be true when no location is selected as well as user does not click other button 
$errWebsite="";
$errName="";
$errNameSize="";
$errAddress="";
$errentrymsg="";
$errEmail="";
$success="";
$errPhone="";
$errMobile="";
$errMobileO="";
$errtwoloc="";
$othertexterr="";
$other="";
$errlocmsg="";
}
?>
<?php
    if($_REQUEST['submit'])
      { 
        //validation for name
            if(preg_match("/^[a-zA-Z][a-zA-Z\. ]+$/", $_POST["n_name"]) === 0 /*||  preg_match("/^[A-Z][a-zA-Z ]$/",$_POST["pet_name"])===0*/)
            {
             $errName='<p>Name must be in form of letters,and must not start with a space</p>';
            }
            //validation of name size
            if(strlen($_POST["n_name"])>36||strlen($_POST["n_name"])<3)
            {
             $errNameSize='<p>given name must be between 3 to 35 characters</p>'; 
            }
            //address validation
            if(preg_match("/^[a-zA-Z0-9 \/\-.,:\"\']+$/", $_POST["n_add"]) === 0)
            {
            $errAddress = '<p> Address must be only letters, numbers or one of the following _ - . , :\"\'</p>';
            }
            //email validation
            
            if (preg_match("/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*\.[a-z]{2,3}$/i",$_POST["n_email"]) === 0)
            {
            $errEmail = '<p>Email must be in given form: chars(.chars)@chars(.chars).chars(2-4)</p>';
            }
            
            //contact no validation
            if($_POST["n_contact1"]!=="")
            {
            if (preg_match ("/^[0-9]{11}$/i" ,$_POST["n_contact1"]) === 0)
            {
            $errPhone = '<p>this telephone number must be of 11 digits with code like 07312552789 </p>';
            }
              }
            //mobile no validation
            
            if (preg_match ("/^[0-9]{10}$/i" ,$_POST["n_contact2"]) === 0)
            {
            $errMobile = '<p>this mobile number must be of 10 digits without code </p>';
            }
          
            //mobile no validation
            if($_POST["n_contact3"]!=="")
            {
            if (preg_match ("/^[0-9]{10}$/i" ,$_POST["n_contact3"]) === 0)
            {
            $errMobileO = '<p>this mobile number must be of 10 digits without code </p>';
            }
            }
            //website url validation
            if($_POST["n_website"]!=="")
            {
            if (preg_match ("/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i" ,$_POST["n_website"])===0)
            {
             $errWebsite='<p>invalid url</p>'; 
            }
            }
            //-------------------------------end of validations-------------------
           if(($_POST['Location'])!=="" )//salect id of selected location
            {               
                 $_SESSION['count']=true;
                 extract($_POST); 
                 global $wpdb;
                 $loc = $_POST['Location'];
                 $d = $wpdb->get_results("select location_id FROM wp_ju_location WHERE location_name='$loc'");
                 foreach ($d as $k => $v) 
                 {
                 $ver =$v->location_id;
                 }
            }
            //if other text field is present and not empty then checking for validation
            if($_SESSION[o1flag]===true && $_POST['othertext']!=="")
            {
                $_SESSION['o2flag']=true;
            
             // $_SESSION['o2flag']=true;
              //  $othertextfield=$_POST['othertext'];
              
            if(preg_match("/^[a-zA-Z][a-zA-Z ]+$/", $_POST["othertext"]) === 0 /*||  preg_match("/^[A-Z][a-zA-Z ]$/",$_POST["pet_name"])===0*/)
            {
             $othertexterr='<p class="msg">new location entered in text field must be in form of letters,and must not start with a space</p>';
             // echo $othertext;
            }
            }
            //if two locations are given
         if(($_SESSION[o1flag]===true) || ($_RESUEST['other']))
         {
           if(($_POST['Location'])!=="" && $_POST['othertext']!=="")
           {
            $errtwoloc='<p class="msg">you can not give 2 locations</p>';

           }
           //select new id generated in location table 
            if(($_POST['othertext'])!=="" && 
                    ($_POST['Location'])==="" && 
                    empty($errName) && 
                    empty($errAddress) && 
                    empty($errEmail)&&
                    empty($errPhone)&& 
                    empty($errMobile)&& 
                    empty($errMobileO) && 
                    empty($errWebsite) && 
                    empty($errtwoloc) &&
                    empty($othertexterr))
            {   
          
               $_SESSION['oflag']=true;
                $_SESSION['count']=true;
                extract($_POST);
                
                $otherloc = $_POST['othertext'];
                global $wpdb;
                $new_loc=array('location_name'=>$otherloc);
                $newlocenter =$wpdb->insert('wp_ju_location',$new_loc);
                $new=$_POST['othertext'];
                $d= $wpdb->get_results("SELECT location_id FROM wp_ju_location where location_name='$new'");
                
                /* @var $k type */
                foreach ($d as $k=>$v) 
                  {
                  $ver = $v->location_id."<br>";
                  }  
               }
         }
         //final entries in table
            if($_SESSION['count']===true && 
                    empty($errWebsite)&& 
                    empty($errName) && 
                    empty($errNameSize) &&
                    empty($errAddress)&& 
                    empty($errEmail)&& 
                    empty($errPhone)&& 
                    empty($errMobile)&& 
                    empty($errMobileO)&& 
                    empty($errtwoloc) &&
                    empty($othertexterr))
            {
                    extract($_POST);
                    //link columns with form data
                    $vet_data=array('vet_name'=>$n_name,
                    'vet_address'=>$n_add,
                    'vet_clinic_no'=>$n_contact1,
                    'vet_mobile_no1'=>$n_contact2,
                    'vet_mobile_no2'=>$n_contact3,
                    'vet_email'=>$n_email,
                    'vet_website'=>$n_website,
                        'vet_location_id'=>$ver);
                     global $wpdb;
                    
                     $dataentry=$wpdb->insert('wp_ju_vets_info',$vet_data);
                     if($dataentry===1)
                     {
                         ?>
                        <!--<script type="text/javascript">
                            alert("entry done");
                            window.location("http://localhost/jeev-uthan/?page_id=91");
                         </script>--><?php
                       $_SESSION['flag']=true;
                       $success='<p class="success">data entered</p>';
                       echo "<script type=\"text/javascript\">
                           setTimeout(\"location.href = ' http://localhost/jeev-uthan/?page_id=95';\",3000);
                         </script>";
                       //wp_redirect("http://localhost/jeev-uthan/?page_id=91");
                       
                     }
                     
            }
            //if location not given 
             if($_SESSION['count']===false)
             {
                 
             $errentrymsg= '<p class="msg">entry can not be done,please check your entries and either select location or enter new location</p>'; 
             }
             if($_SESSION['oflag']===false&&$_POST['Location']=="")
             {
                // $_SESSION['o3flag']=true;
               $errlocmsg='<p class="msg">select given location or enter new location through other button</p>';
             }
             
          
     }
      if($_REQUEST['logout'])
     {
         wp_redirect(' http://localhost/jeev-uthan/?page_id=109');
     }
      if($_REQUEST['tongo'])
     {
         wp_redirect(' http://localhost/jeev-uthan/?page_id=91');
     }?>
<html>
     <head>
         <style>
          .msg{ color: red;font-style: italic;}
         
          .success{
              color:green;font-style: bold;
          }
         </style></head>
    <body>
   
    <form method="POST" style="margin-left: 300px;" >
    <table border="0px">
   
    
    <tr><td colspan="5"><h3>Veterinary Registration</h3><br>(fields marked as <span class="errText">*</span> are required)</td></tr>
    <tr><td  colspan="2"><span class="errText">*</span>Name: </td> <td ><input type ="text" name="n_name" placeholder="enter name" value="<?php if($_SESSION['flag']===false){echo $_POST['n_name'];}?>"></td></tr>
    <tr><td colspan="2"></td><td ><?php if($errName!==""){?><div class="msg"><?php echo $errName;}?></div></td></tr>
    <tr><td colspan="2"></td><td ><?php if($errNameSize!==""){?><div class="msg"><?php echo $errNameSize;}?></div></td></tr>
    <tr><td colspan="2"> <span class="errText">*</span>Address:</td><td> <textarea rows='2' cols='10'  style="resize:none;width:153px; height:100px;" name="n_add" placeholder="enter address"><?php if($_SESSION['flag']===false){echo $_POST['n_add'];}?></textarea></td></tr>
    <tr><td colspan="2"></td><td ><?php if($errAddress!==""){?><div class="msg"><?php echo $errAddress;}?></div></td></tr>
    <tr><td colspan="2">clinic no.:</td><td><input type="text" id="mobile-number" placeholder="11 digit no" name="n_contact1"  length="11" value="<?php if($_SESSION['flag']===false){echo $_POST['n_contact1'];}?>"></td></tr>
    <tr><td colspan="2"></td><td ><?php if($errPhone!==""){?><div class="msg"><?php echo $errPhone;}?></div></td></tr>
    <tr><td colspan="2"><span class="errText">*</span>mobile no.:</td><td><input type="text" id="mobile-number" placeholder="10 digit no" name="n_contact2" length="10" value="<?php if($_SESSION['flag']===false){echo $_POST['n_contact2'];}?>"></td></tr>
    <tr><td colspan="2"></td><td ><?php if($errMobile!==""){?><div class="msg"><?php echo $errMobile;}?></div></td></tr>
    <tr><td colspan="2">other no.:</td><td><input type="text" id="mobile-number" placeholder="10 digit no" name="n_contact3" length="10" value="<?php if($_SESSION['flag']===false){echo $_POST['n_contact3'];}?>"></td></tr>
    <tr><td colspan="2"></td><td ><?php if($errMobileO!==""){?><div class="msg"><?php echo $errMobileO;}?></div></td></tr>
    <tr><td colspan="2"> <span class="errText">*</span>Email id:</td><td> <input type="email" name="n_email" placeholder="john.12son@gmail.com" value="<?php if($_SESSION['flag']===false){echo $_POST['n_email'];}?>"></td></tr>
    <tr><td colspan="2"></td><td ><?php if($errEmail!==""){?><div class="msg"><?php echo $errEmail;}?></div></td></tr>
    <tr><td colspan="2"> WebSite :</td><td><input type="text" name="n_website" placeholder="website url"value="<?php if($_SESSION['flag']===false){echo $_POST['n_website'];}?>"></td></tr>
    <tr><td colspan="2"></td><td ><td><?php if($errWebsite!==""){?><div class="msg"><?php echo $errWebsite;}?></div></td></tr>
    
    
 <!-- photo of pet:<button name="upload" value="upload" ></button>-->
    <tr>
    <td colspan="2"><span class="errText">*</span>location of Veterinary Doctors</td>
    
        <?php
         global $wpdb; 
         $qu = $wpdb->get_results("SELECT location_name FROM wp_ju_location");
        ?>
    <td><select style="width:163px;" name="Location" id="location">
         <option value="">select</option>
         <?php 
         foreach($qu as $a=>$b)
         {
         ?>
         <option value="<?php echo $b->location_name;?>">
         <?php        
         echo $b->location_name."<br>";
         }
         ?>
         </option>
        </select></td>
    <td><input type="submit" name="other" value="other"></td>
       
    
    <?php if($_REQUEST['other'])
    {
         $_SESSION['oflag']=true;

         //extract($_POST);
        if($_SESSION['oflag']===true && $_POST['Location']=="" )
                {
                  ?>
              
        <td><input type ="text" name="othertext" value="<?php if($_SESSION['flag']===false && $_POST['othertext']!==""){echo $_POST['othertext'];}?>"></td>
     <?php
                 $_SESSION['o1flag']=true;
                
                }
         elseif(($_POST['Location'])!=="")
            {
              ?><script type="text/javascript">
        document.getElementById('location').value = "<?php echo $_POST['Location'];?>";
        </script>
        <td class="msg">
       <?php
       echo 'you have already choose the location,first unselect location in combobox then enter new location';?></td><?php
            }
         
                
    }
                        
            if($_SESSION['o2flag']===true)
            {?>
         <td><input type ="text" name="othertext" value="<?php if($_SESSION['flag']===false)echo $_POST['othertext'];?>"></td>
    </tr>
    <tr><td colspan="2"></td><td ><?php echo $errtwoloc;?></td></tr>
    <tr><td colspan="2"></td><td ><?php echo $errentrymsg;?></td><td></td><td ><?php echo $othertexterr;?></td></tr>
   
    
       <?php
            
            }
    
    ?><tr><td colspan="2"></td><td ><?php echo $errlocmsg;?></td></tr>  
    <tr><td colspan="5"><input type="submit" name="submit"></td></tr>
    
      <tr ><td colspan="5"><input type ="submit" name="logout" value="Log Out"></td> </tr>
       <tr ><td colspan="5"><input type ="submit" name="tongo" value="NGO Registration"></td> </tr>
       
    <tr><td><?php echo $success;?></td></tr>
       
        
</table> 
</form>
</body>
</html>