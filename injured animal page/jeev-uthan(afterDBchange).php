<?php /**
 * Template Name: Jeev-Uthan
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */

?>
 <head>
 <style>
 *{padding:0px; margin:0px;}
 .captcha{font-family: Arial, Helvetica, sans-serif; width:300px; height:150px; line-height:60px; }
 p{font-size:40px; color:rgba(36,32,31,.7); position:absolute; top:50px; left:600px;}
 .cap{top : 160px; position: absolute;left:500px}
 .tagline{font-family: "ARHERMANN.ttf"; font-size: 25px; left: 600px}
 .head{color:rgba(47,56,176,.7)}
 </style>
 </head>
 
 <body>
 <div class="captcha">
     <form style="margin-left:500px">
 <p> 
     
 <?php 
 session_start();
 if('POST' !== $_SERVER['REQUEST_METHOD'])
 {
 $_SESSION['rand_code']=rand(1000,9999);

 }
 
 echo  $_SESSION['rand_code'];
 ?>
 </p>
 <img src="<?php echo get_template_directory_uri();?>/page-templates/capimage.jpg">
</div><br><br>
</form>
     <div class="cap">
         enter given captcha<br>
         </div> 
     <form action="" method="post" style="margin-left:500px">
     <input type="text" name="enter_captcha"><br><br>
     <div class = "tagline" >nearby location of injured animal</div><br><br>
    <?php
         global $wpdb; 
         $qu = $wpdb->get_results("SELECT location_name FROM wp_ju_location");
    ?>
        
    Location<select name="Location">
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
     ?>
    </select><br><br>
     
     <input type="submit" name="submit">
     </form>
</body>
 </html>
 
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
          <div>
          <?php
          foreach($d1 as $a=>$b)
              {?><div class="head">veterinary doctor's information:---</div><?php
           echo $b->vet_name."<br>";
           echo $b->vet_address."<br>";
           echo $b->vet_mobile_no1."<br>";
           echo $b->vet_mobile_no2."<br>";
           echo $b->vet_clinic_no."<br>";
          }
          foreach($d2 as $a=>$b)
              {?><div class="head">NGO information:---</div><?php
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
          {
             echo 'Enter captcha is wrong please try again';   
          }
          
             
         }
     else 
     {
        echo 'please enter both the fields';   
     }
     }
     
?>