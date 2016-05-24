<?php /**
 * Template Name: Jeev-Uthan
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */
//get_header();
?>

 <?php
         if($_REQUEST['submit'])      
         {
      /* @var $_POST type */
         if(($_POST['Location'])!=="" && $_POST['enter_captcha'] !=="")
         {
         extract($_POST);
         
         $cap = $_POST['enter_captcha'];
         
         if($_SESSION['rand_code']==$cap)
         {
           $_SESSION['success']=true;
          $loc = $_POST['Location'];
          global $wpdb;
          $d = $wpdb->get_results("select location_id FROM wp_ju_location WHERE location_name='$loc'");
          foreach ($d as $c => $z) {
          $d1 =$wpdb->get_results("select * FROM wp_ju_vets_info WHERE vet_location_id=$z->location_id;");
        
          }
          foreach ($d as $c => $z) {
          $d2 =$wpdb->get_results("select * FROM wp_ju_ngo_info WHERE ngo_location_id=$z->location_id;");
        
          }
          
    ?>
          <div class="head">
          <?php
          foreach($d1 as $a=>$b)
              {
           echo $b->vet_name."<br>";
           echo $b->vet_address."<br>";
           echo $b->vet_mobile_no1."<br>";
           echo $b->vet_mobile_no2."<br>";
           echo $b->vet_clinic_no."<br>";
          }
          foreach($d2 as $a=>$b)
              {
        echo $b->ngo_name."<br>";
        echo $b->ngo_address."<br>";
        echo $b->ngo_contact_no1."<br>";
        echo $b->ngo_contact_no2."<br>";
        echo $b->ngo_contact_no3."<br>";
        
              }
          ?>
          </div>
      
        <?php
        }
         else 
            { ?><div class="war"><?php
             echo 'Enter captcha is wrong please try again';   
            }?></div>
          
             
        <div class="war"> <?php 
    }
       
     else 
     {
        echo 'please enter both the fields';   
     }
     }
     
     ?></div>
<html>
 <head>
 <style>
 *{padding:0px; margin:0px;}
 .captcha{font-family: Arial, Helvetica, sans-serif; width:300px; height:150px; line-height:60px; }
 p{font-size:40px; color:rgba(36,32,31,.7); position:absolute; top:275px; left:600px;}
 .cap{top : 400px; position: absolute;left:500px;font-size:20px }
 .tagline{font-family: "ARHERMANN.ttf"; font-size: 25px; left: 600px}
 .head{ top : 500px;left:700px; position:absolute;}
 .war{left:700px;top : 500px;font-size:20px; position:absolute;color:red;}
 .errtext{color:red}
 </style>
 </head>
 <body>
<form action="" method="post" style="margin-left:500px; margin-top: 100px; widthBox:auto;">
         <div class = "tagline" >select location to find information of NGOs and VETs</div><br><br>
         <?php
         global $wpdb; 
         $qu = $wpdb->get_results("SELECT location_name FROM wp_ju_location");
    ?>
        
   <span class="errText">*</span> Location<select name="Location">
        <option value="">select</option>
    <?php 
         foreach($qu as $a=>$b)
         {
    ?>
     
    <option value="<?php echo $b->location_name;?>">
    <?php        
         echo $b->location_name."<br>";
    ?>
    </option>
    <?php 
     } 
     ?> </select><br><br>
     <div class="captcha">
     <p> 
     
 <?php 
 session_start();
 if('POST' !== $_SERVER['REQUEST_METHOD'] || $_SESSION['success']==true)
 {
 $_SESSION['rand_code']=rand(1000,9999);
 $_SESSION['success']=false;
 }
 
 echo  $_SESSION['rand_code'];
 ?>
 </p>
 <img src="<?php echo get_template_directory_uri();?>/page-templates/capimage.jpg">
 </div><br><br>   
 <div class="cap">
 ENTER THE GIVEN NUMBER YOU SEE IN THE IMAGE<br>
 <b>This is just to check if you are a robot</b> 
 </div><br><br>
 
 <span class="errText">*</span><input type="text" name="enter_captcha"><br>
 <input type="submit" name="submit">
 </form>
 </body></html>