<?php /**
 * Template Name: Jeev-Uthan
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */
get_header();
if('POST' !== $_SERVER['REQUEST_METHOD'])
 {
    $err="";
 }
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
          
              <table style="margin-top: 1100px;margin-left: -10px;position: absolute;">
          <?php
          foreach($d1 as $a=>$b)
              {
              ?><tr><td>
                  <table>
                      <tr><td><b>Vet Name:</b></td><td><?php echo $b->vet_name;?></td></tr>
              <tr><td><b>Vet Address:</b></td><td><?php echo $b->vet_address;?></td></tr>
          <?php if($b->vet_mobile_no1!==""){?> <tr><td><b>Vet Mobile No:</b></td><td><?php echo $b->vet_mobile_no1;?></td></tr><?php }?>
           <?php if($b->vet_mobile_no2!==""){?><tr><td><b>Vet Mobile No(other):</b></td><td><?php echo $b->vet_mobile_no2;?></td></tr><?php }?>
           <?php if($b->vet_clinic_no!==""){?><tr><td><b>Vet Clinic No:</b></td><td><?php echo $b->vet_clinic_no;?></td></tr><?php }?>
              </table></td>
         <?php }?>
             
              <?php
          foreach($d2 as $a=>$b)
              {?><td>
                  <table>
          <tr><td><b>NGO Name:</b></td><td><?php echo $b->ngo_name;?></td></tr>
         <tr><td><b>NGO Address:</b></td><td><?php echo $b->ngo_address;?></td></tr>
         <tr><td><b>NGO Office No:</b></td><td><?php echo $b->ngo_contact_no1;?></td></tr>
         <tr><td><b>NGO Mobile No:</b></td><td><?php echo $b->ngo_contact_no2;?></td></tr>
         <tr><td><b>NGO Other No:</b></td><td><?php echo $b->ngo_contact_no3;?></td></tr></td></tr></table></td></tr>
        <?php
              }
          ?>
              </table>
          
      
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
        $err= '<p class="errText">please enter both the fields</p>';   
     }
     }
     
     if($_REQUEST['page_refresh'])
     {
          echo "<script type=\"text/javascript\">
                           setTimeout(\"location.href = '  http://localhost/jeev-uthan/?page_id=76';\",0);
                         </script>";
     }
     
     ?></div>
<html>
 <head>
 <style>
 *{padding:0px; margin:0px;}
 .captcha{font-family: Arial, Helvetica, sans-serif; width:300px; height:150px; line-height:60px;margin-top: -10px;}
 #captchtext{font-size:30px; color:rgba(36,32,31,.7); position:relative; left:100px;top:130px;}
 .cap{top : 890px; position: absolute;left:500px;font-size:20px }
 .tagline{font-family: "ARHERMANN.ttf"; font-size: 25px; left: 300px}
 .head{ top : 500px;left:700px; position:absolute;}
 .war{left:700px;top : 500px;font-size:20px; position:absolute;color:red;}
 .errtext{color:red}
 </style>
 </head>
 <body>
<form action="" method="post" style="margin-left:500px; margin-top: 100px; widthBox:auto;">
    <div class = "tagline" ><h4>select location to find information of NGOs and VETs</h4></div><br>
         <?php
         global $wpdb; 
         $qu = $wpdb->get_results("SELECT location_name FROM wp_ju_location");
    ?>
        
   <span class="errText">*</span> Location<select id="loc" name="Location">
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
    <script type="text/javascript">
                document.getElementById('loc').value = "<?php if($err!==""){echo $_POST['Location'];}?>";
            </script>
     <p id="captchtext"> 
     
 <?php 
 session_start();
 if('POST' !== $_SERVER['REQUEST_METHOD'] || $_SESSION['success']===true)
 {
 $_SESSION['rand_code']=rand(1000,9999);
 $_SESSION['success']=false;
 }
 
 echo  $_SESSION['rand_code'];
 ?>
 </p>
  <div class="captcha">
 <img src="<?php echo get_template_directory_uri();?>/page-templates/capimage.jpg">
 </div><br><br>   
 <div class="cap">
 ENTER THE GIVEN NUMBER YOU SEE IN THE IMAGE<br>
 <b>This is just to check if you are a robot</b> 
 </div><br><br>
 
 <span class="errText">*</span><input type="text" name="enter_captcha"><br><br>
 <table><tr><td><?php echo $err;?></td></tr>
     <tr><td colspan="2"><input type="submit" name="submit"></td>
         <td ><input type="submit" name="page_refresh" value="refresh page"></td></tr>
 </table>
 
 </form>
     <div style="margin-left: 500px"><h6>The information of NGO and veternary doctors will be shown below:</h6></div>
 </body></html>
<div style="margin-top:1000px;position: absolute;"><?php get_footer();?></div>