<?php

/**
 * Template Name:missingpetinfo
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */
get_header();
?>
<html>
    <head></head>
    <body>
        <div  style="margin-top:450px;position:absolute;">
        <form action="" method="POST">
             <input type="submit" name="postinfo" value="Post Missing Pet Information" style="width: 500px;height:50px;margin-left: 250px;background-color: red;color: white;font-size:35px;">
        </form>
<div style="background-color:#EAE5D7;margin-left: -40px;">
    <h1 style="background-color: rgb(57,234,230);"><div style="margin-left: 300px;">LIST OF MISSING PETS</div></h1>
        <?php
    global $wbdb;
      $uploads = wp_upload_dir(); 
      //extract data of missing pet from database
    $pet_data=$wpdb->get_results("select * from wp_ju_missingpets");
    foreach($pet_data as $a=>$b)
    {  
       $path='/'.$b->pet_photo_uploadedon.'/'.$b->pet_photo_name;?>
          
    <table style="background-color:#EAE5D7;" cellspacing="50px" cellpadding="50px">
    <tr>
        <td style="width: 150px;height: 300px;">
            <!--display image of pet-->
        <?php echo '<img src="' . esc_url( $uploads['baseurl'] . $path) . '" href="#" width="200px" height="200px">';?>
        <form action="http://localhost/jeev-uthan/?page_id=147&petid=" method="POST">
            <input type="text" value="<?php echo $b->pet_id;?>" name="petid" style="visibility: hidden;">
            <table><tr><td><input type="submit" value="change status" name="change_status"></form></td></tr></table>
    </td><?php
          $id= $b->owner_id;
        
    //extract data of owner from owner table
    $o_data=$wpdb->get_results("select * from wp_ju_petowner_info where owner_id=$id");
        foreach($o_data as $x=>$y) 
        { 
             ?>
    <!--display pet information-->
     <td style="width: 400px;height: 300px;">
        <table><tr><td colspan="2"><h3>Pet Information</h3></td></tr>
            <tr><td>Pet Name:</td><td><?php echo $b->pet_name?></td></tr>
            <tr><td>Pet Type:</td><td><?php echo $b->pet_type?></td></tr>
            <tr><td>Pet Breed:</td><td><?php echo $b->pet_breed?></td></tr>
            <tr><td>Pet Height:</td><td><?php echo $b->pet_height?></td></tr>
            <tr><td>Pet Color:</td><td><?php echo $b->pet_color?></td></tr>
            <tr><td>Pet Missing Date:</td><td><?php echo $b->pet_missing_date?></td></tr>
            <tr><td>Pet Missing Location:</td><td><?php echo $b->pet_location?></td></tr>
            <tr><td>Pet Status:</td><td><?php if($b->pet_status==0){echo "Missing";}else{echo "Found";}?></td></tr>
          </table>
    </td>
    <!--display owner info -->
    <td style="width: 400px;height: 300px;">
         
                <table><tr><td colspan="2"><h3>Owner Information</h3></td></tr>
            <tr><td>Owner Name:</td><td><?php echo $y->owner_name?></td></tr>
            <tr><td>Contact no:</td><td><?php echo $y->owner_contact_no?></td></tr>
            <tr><td>Email id:</td><td><?php echo $y->owner_email_id?></td></tr>
            <tr><td>Address:</td><td><?php echo $y->owner_address?></td></tr>
            <tr><td>City:</td><td><?php echo $y->owner_city?></td></tr>
             </table>
   </td>
            
  
        <?php
        }
        ?>
         <?php
   }
   //redirect to missing animal form on click on postinfo button
   if(isset($_REQUEST['postinfo']))
   {
        echo "<script type=\"text/javascript\">
                      setTimeout(\"location.href = ' http://localhost/jeev-uthan/?page_id=39';\",0);
                     </script>";
   }?>

        </tr> </table></div>
    </body></html>
<?php
get_footer();
?>


