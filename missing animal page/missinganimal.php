<?php
/**
 * Template Name:missinganimal
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */
get_header();

session_start();
 if('POST' !== $_SERVER['REQUEST_METHOD'])
 {
  $success="";
  $errPetName="";
 $errOName="";
$errPNameSize="";
$errONameSize="";
$errPhone="";
$errAddress="";
$errEmail="";
$errCity="";
$errPetType="";
$errPetBreed="";
$errPetHeight="";
$errPetColor="";
$errPetLocation="";
 $errOQuestion="";
  $errOAnswer="";
  $errCaptcha="";
  $errFileType="";
  $fileuploaded="";
$_SESSION['flag']=false;
 }


 ?>
<?php

if(isset($_REQUEST['submit']))
{
    
    extract($_POST);
    
    //form validation
    //validate  owner name
    // Full Name must contain lettersand spaces only and must start with upper case letter.
    if(preg_match("/^[a-zA-Z]+[ ][a-zA-Z]+$/", $_POST["o_name"])===0) {
        $errOName = '<p class="errText">Name must contain firstname lastname<br>should contain only characters</p>';
    }
    if(strlen($_POST["o_name"]) >36 || strlen($_POST["o_name"]) <5)
    {
        $errONameSize= '<p class="errText">Name must not be greater than 36 or less than 5 characters </p>';
    }
    //validate pet name
     if(preg_match("/^[a-zA-Z ]+$/", $_POST["pet_name"])===0) {
        $errPetName = '<p class="errText">Name must contain only letters, spaces and must not start with a space</p>';
    }
    if(strlen($_POST["pet_name"]) >36 || strlen($_POST["pet_name"]) <2)
    {
        $errPNameSize= '<p class="errText">Name must not be greater than 36 or less than 2 characters </p>';
    }
    
    //contact number should be of ten digit and in for Phone mask 1-800-999-9999      
    if (preg_match ("/^[0-9]{10}$/i" ,$_POST["o_number"]) === 0) {
        $errPhone = '<p class="errText">mobile no must be of 10 digits</p>';
    }
    
    //address can contain alphanumeric characters as well as symbols like ' " : ;  . /
    if(preg_match("/^[a-zA-Z0-9 \/\-.,:\"\']+$/", $_POST["o_add"]) === 0){
         $errAddress = '<p class="errText">Address must contain only letters, numbers or one of the following _ - . , :\"\'</p>';
    }
    //validation for email
    // Email mask
  if (preg_match("/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*\.[a-z]{2,3}$/i",$_POST["o_email"]) === 0) {
    $errEmail = '<p class="errText">Email must comply with this mask: chars(.chars)@chars(.chars).chars(2-4)</p>';
    }
    //validation for city
    if($_POST['o_city']!=="")
    {
    if(preg_match("/^[a-zA-Z]+( [a-zA-Z]+)*$/",$_POST["o_city"])===0){
             $errCity = '<p class="errText">must contain only characters</p>';
    }
    }
//validation of  pet type
    if($_POST['pet_type']=="")
    {
        $errPetType='<p class="errText">please select a pet type</p>';
    }
    //validation of pet breed
    if(preg_match("/^[a-zA-Z ]+$/", $_POST["pet_breed"])===0)
    {
        $errPetBreed='<p class="errText">Breed of pet should contain only alphabets and space <p>';
    }
    //validate pet color
      if(preg_match("/^[a-zA-Z ]+$/", $_POST["pet_color"])===0)
    {
        $errPetColor='<p class="errText">Color of pet should contain only alphabets <p>';
    }
    //validate pet height
    if(preg_match("/^[0-9]{2,3}+(\.[0-9]{0,3}+)$/", $_POST['pet_height'])===0 && strlen($_POST['pet_height'])<186)
    {
        $errPetHeight='<p class="errText">should be numeric and should be less than 186 cms <p>';
    }

    
    //validate date
    if(preg_match("/^d{4}-d{2}-d{2}$/", $_POST['pet_date'])===0 &&  $_POST['pet_date']==="")
    {
        $errPetDate='<p class="errText">please select a date<p>';
    }
   
    //validate pet location
    if($_POST['pet_m_location']=="")
    {
        $errPetLocation='<p class="errText">please select a pet missing location</p>';
    }
    
    //validate question
     if($_POST['o_question']=="")
    {
        $errOQuestion='<p class="errText">please select a security question</p>';
    }
   //validate answer
     if(preg_match("/^[a-zA-Z ]+$/", $_POST["o_answer"])===0)
    {
        $errOAnswer='<p class="errText">Answer should contain only alphabets and space <p>';
    }
    //validate captcha
    
    if($_SESSION['rand_code']!=$_POST['enter_captcha'])
    {
        $errCaptcha='<p class="errText">please enter correct captcha<p>';
    }
   if(empty($errPetName)&&empty($errPNameSize) &&
                                            empty($errPhone) &&
                                           empty($errAddress)  &&
                                           empty($errEmail)  &&
                                            empty($errCity)  &&
                                            empty($errPetType)  &&
                                            empty($errPetBreed) &&
                                           empty($errPetHeight) &&
                                            empty($errOName)&&
                                            empty($errOName) &&
                                             empty($errPetColor)&&
                                             empty($errOQuestion)&&
                                             empty($errOAnswer)&&
                                             empty($errCaptcha)&&
                                             empty($errPetLocation))
       { 
        //code to upload image and save its name in database
        if ( ! function_exists( 'wp_handle_upload' ) ) 
            {
                    require_once( ABSPATH . 'wp-admin/includes/file.php' );
             }
        //take username from input field
        $uploadedfile = $_FILES['pet_photo'];
    
            //print_r($uploadedfile);
            //check for correct file type
        if(!empty($uploadedfile['name']))
        {
            if($uploadedfile['type']=="image/png" || 
                    $uploadedfile['type']=="image/jpg" || 
                    $uploadedfile['type']=="image/gif" ||
                    $uploadedfile['type']=="image/tif" ||
                    $uploadedfile['type']=="image/svg"||
                     $uploadedfile['type']=="image/jpeg")
            {
     
            $photoname = $uploadedfile['name'];
                //echo $photoname;
            $upload_overrides = array( 'test_form' => false);

            $movefile = wp_handle_upload( $uploadedfile, $upload_overrides );

            if ( $movefile && !isset( $movefile['error'] ) ) 
           {
                    $fileuploaded="<p style=\"color:blue\">File is valid, and was successfully uploaded.</p>";
                    //var_dump( $movefile);
            } 
            else 
           {
                    /**
                     * Error generated by _wp_handle_upload()
                     * @see _wp_handle_upload() in wp-admin/includes/file.php
                     */
                    echo $movefile['error'];
            }
            global $wpdb;
            //get photo uploaded on date in the format year/month
           $uploaddate=  current_time('Y/m');
            }
            else
            {
                $errFileType="<div style=\"color: red\">invalid file format , we only except jpg , png , tif , gif , svg , jpeg</div>";
           
             }
        }
        if($errFileType!=="")
        {
                $name=$_POST['o_name'];
                //link columns with form data
                $owner_data=array('owner_name'=>$o_name,
                                    'owner_contact_no'=>$o_number,
                                    'owner_email_id'=>$o_email,
                                    'owner_address'=>$o_add,
                                    'owner_city'=>$o_city,
                                    'owner_q_no'=>$o_question,
                                    'owner_q_answer'=>$o_answer);

                //insert information of owner in wp_ju_petowner_info
                
               $x=$wpdb->insert('wp_ju_petowner_info',$owner_data);
               //echo $x;
               //get owner_id from wp_ju_petowner_info table
                $ownerid=$wpdb->get_results("select owner_id FROM wp_ju_petowner_info WHERE owner_name='$name'");
             $o_id;
                foreach($ownerid as $a=>$b)
                {
                   $o_id=$b->owner_id;
                }
                //set status to 0 means missing 
                $pet_status=0;
                //link columns of table with form data
              $pet_data=array('owner_id'=>$o_id,
                                    'pet_name'=>$pet_name,
                                    'pet_height'=>$pet_height,
                                    'pet_breed'=>$pet_breed,
                                    'pet_color'=>$pet_color,
                                    'pet_type'=>$pet_type,
                                    'pet_missing_date'=>$pet_date,
                                    'pet_photo_name'=>$photoname,
                                    'pet_photo_uploadedon'=>$uploaddate,
                                    'pet_location'=>$pet_m_location,
                                    'pet_status'=>$pet_status);
        $color=$_POST['pet_color'];
               
              //insert pet info in  wp_ju_missingpets table
              $y=$wpdb->insert('wp_ju_missingpets',$pet_data);
              if($x==1 && $y==1)
              {
                          $_SESSION['flag']=true;
                         $success='<p>data submitted successfully</p>';
                         echo "<script type=\"text/javascript\">
                           setTimeout(\"location.href = 'http://localhost/jeev-uthan/?page_id=39#';\",5000);
                         </script>";
               }
       }
       }
    /*else
    {  
        
        echo '<span style="color:red;">there is any wrong entry please check the form</span>';
         
    }*/

}

?>

<html lang="en">
<head>
 
  <meta charset="utf-8">
    <title>jQuery UI Datepicker - Default functionality</title>
  <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
  <script src="//code.jquery.com/jquery-1.10.2.js"></script>
  <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
  <link rel="stylesheet" href="/resources/demos/style.css">
  <script>
 $(function() {
    $( "#datepicker" ).datepicker({
       dateFormat:"yy-mm-dd"
    });
  });
  </script>
     <style>
         
 *{padding:0px; margin:0px;}
 .captcha{font-family: Arial, Helvetica, sans-serif; width:100px; height:150px; line-height:60px; top:10px;}
 #captchatext{font-size:40px; color:rgba(36,32,31,.7); position:relative; top:-100px; left:90px;}
 .cap{top : 1150px; position: relative;left:230px;font-size:15px }
 .tagline{font-family: "ARHERMANN.ttf"; font-size: 25px; left: 600px}
 .head{ top : 300px;left:500px;}
 .war{left:1000px;top : 200px;font-size:40px;}
 </style>
 
</head>
    <body>
    <form method="POST" style="margin-left: 100px" enctype="multipart/form-data" >
    <table border="0px">
        <tr><td colspan="3"><h3>Pet information:</h3><br>(fields marked as <span class="errText">*</span> are required)</td></tr>
        <tr><td> <span class="errText">*</span>Pet Name:</td><td colspan="2">  <input type ="text" name="pet_name" placeholder="name" value="<?php if($_SESSION['flag']===false){echo $_POST['pet_name'];}?>"></td></tr>
        <tr><td></td><td colspan="2"><?php if($errPetName!==""){echo $errPetName;}if($errPNameSize!==""){echo $errPNameSize;}?></td></tr>
        <tr><td> <span class="errText">*</span>Pet Height:</td><td colspan="2"> <input type="text" name="pet_height" placeholder="in cms" value="<?php if($_SESSION['flag']===false){echo $_POST['pet_height'];}?>"></td></tr>
        <tr><td></td><td colspan="2"><?php if($errPetHeight!==""){echo $errPetHeight;}?></td></tr>
        <tr><td><span class="errText">*</span>Pet Breed: </td><td colspan="2"><input type="text" name="pet_breed" placeholder="eg:Bulldog(dog)" value="<?php if($_SESSION['flag']===false){ echo $_POST['pet_breed'];}?>"></td></tr>
        <tr><td></td><td colspan="2"><?php if($errPetBreed!==""){echo $errPetBreed;}?></td></tr>
    <tr><td> <span class="errText">*</span>Pet color:</td><td colspan="2"> <input type="text" name="pet_color" placeholder="eg:white"value="<?php if($_SESSION['flag']===false){echo $_POST['pet_color'];}?>"></td></tr>
    <tr><td></td><td colspan="2"><?php if($errPetColor!==""){echo $errPetColor;}?></td></tr>
    <tr><td><span class="errText">*</span>Pet Type:</td><td  colspan="2"><select name="pet_type" id="type"  style="width:173px;"><option value="">select</option>
            <option value="dog">dog</option>
            <option value="cat">cat</option>
            <option value="bird">bird</option>
             <option value="cow">cow</option>
            <option value="rabbit">rabbit</option>
            <option value="buffalo">buffalo</option>
            <option value="tortoise">tortoise</option></select></td>
             <script type="text/javascript">
  document.getElementById('type').value = "<?php if($_SESSION['flag']===false){echo $_POST['pet_type'];}?>";
</script></tr>
    <tr><td></td><td colspan="2"><?php if($errPetType!==""){echo $errPetType;}?></td></tr>
    <tr><td><span class="errText">*</span>Pet Missing date:</td><td colspan="2"><input type="text" id="datepicker" name="pet_date" placeholder="yyyy-mm-dd" value="<?php if($_SESSION['flag']===false){echo $_POST['pet_date'];}?>"></td></tr>
    <tr><td></td><td><?php if($errPetDate!==""){echo $errPetDate;}?></td></tr>
    <tr><td><span class="errText">*</span>Pet Missing location:</td><td  colspan="2"><?php
            global $wpdb;
            $location=$wpdb->get_results("select location_name from wp_ju_location");?><select name="pet_m_location" id="location" style="width:173px;"><option value=""  >select</option>
            
            <?php
            foreach($location as $x=>$y)
            {
              ?><option value="<?php echo $y->location_name;?>"><?php echo $y->location_name;?></option>
            <?php
            }
            ?>
            <option value="other">other</option></select></td>
             <script type="text/javascript">
  document.getElementById('location').value = "<?php if($_SESSION['flag']===false){echo $_POST['pet_m_location'];}?>";
</script></tr>
    <tr><td></td><td colspan="2"><?php if($errPetLocation!==""){echo $errPetLocation;}?></td></tr>
    
    <tr><td colspan="3"><h4>Please Choose a photo of pet if you have</h4></td></tr>


<!--<input type="hidden" name="MAX_FILE_SIZE" value="10000000" />-->
    <tr><td>Choose Pet Photo:</td><td><input name="pet_photo" type="file"></td></tr>
<tr ><td></td><td colspan="2"><?phpif(errFileType!==""){ echo $errFileType;}?></td></tr>
    <tr><td colspan="3"><h3>Owner Information:</h3></td></tr>
    <tr><td><span class="errText">*</span>Name: </td> <td colspan="2"><input type ="text" name="o_name"  placeholder="First Last name " value="<?php if($_SESSION['flag']===false){echo $_POST['o_name'];}?>"></td></tr>
    <tr><td></td><td colspan="2"><?php if($errOName!==""){echo $errOName;}if($errONameSize){echo $errONameSize;}?></td></tr>
    <tr><td><span class="errText">*</span>Mobile no:</td><td colspan="2"><input type="text" id="mobile-number" placeholder="10 digit number" name="o_number"  value="<?php if($_SESSION['flag']===false){echo $_POST['o_number'];}?>"></td></tr>
    <tr><td></td><td colspan="2"><?php if($errPhone!==""){echo $errPhone;}?></td><td><?php if($errZip!==""){echo $errZip;}?></td></tr>
    <tr><td><span class="errText">*</span> Email id:</td><td colspan="2"> <input type="text" name="o_email" placeholder="john.12son@gmail.com"value="<?php if($_SESSION['flag']===false){echo $_POST['o_email'];}?>"></td></tr>
    <tr><td></td><td colspan="2"><?php if($errEmail!==""){echo $errEmail;}?></td></tr>
    <tr><td><span class="errText">*</span>Address:</td><td colspan="2"> <textarea style="resize: none; width: 160px;" id="address" rows="2" cols="10" name="o_add"><?php if($_SESSION['flag']===false){echo $_POST['o_add'];}?></textarea></td></tr>
    <tr><td></td><td colspan="2"><?php if($errAddress!==""){echo $errAddress;}?></td></tr>
    <tr><td>City:</td><td colspan="2"><input type="text" name="o_city" placeholder="eg:indore" value="<?php if($_SESSION['flag']===false){echo $_POST['o_city'];}?>"></td></tr>
    <tr><td></td><td colspan="2"><?php if($errCity!==""){echo $errCity;}?></td></tr>
    <tr><td><span class="errText">*</span>security question:</td><td  colspan="2"><select name="o_question"  id="question" style="width:173px;"><option value="">select</option>
            <option value="0">What is your best friend's name?</option>
            <option value="1">What is your home town?</option>
            <option value="2">Name of your favourite book?</option>
            <option value="3">What is your hobby?</option>
            <option value="4">Who is your ideal person?</option>
            </select>
           <script type="text/javascript">
                document.getElementById('question').value = "<?php if($_SESSION['flag']===false){echo $_POST['o_question'];}?>";
            </script></td></tr>
            <tr>
                <td></td><td colspan="2"><?php if($errOQuestion!==""){echo $errOQuestion;}?></td></tr>
    <tr><td><span class="errText">*</span>Answer:</td><td colspan="2"><input type="text" name="o_answer" value="<?php if($_SESSION['flag']===false){echo $_POST['o_answer'];}?>"></td></tr>   
    <tr><td></td><td colspan="2"><?php if($errOAnswer!==""){echo $errOAnswer;}?></td></tr>    
<tr><td><span class="errText">*</span>Enter the given captcha:</td><td colspan="2"><div class="captcha">
     <img src="<?php echo get_template_directory_uri();?>/page-templates/capimage.jpg">
 
  <p id="captchatext">   
 <?php 
//session_start();
 
 if('POST' !== $_SERVER['REQUEST_METHOD'])
 {
 $_SESSION['rand_code']=rand(1000,9999);

 }
 
 echo  $_SESSION['rand_code'];
 ?></p>
 </div>  
 
 </td></tr>
 
<tr><td></td><td><input type="text" name="enter_captcha" value="<?php if($_SESSION['flag']===false){echo $_POST['enter_captcha'];}?>"><br><br></td></tr>
<tr><td></td><td colspan="2"><?php if($errCaptcha!==""){echo $errCaptcha;}?></td></tr>
<tr ><td></td><td colspan="2"><input type="submit" name="submit"></td></tr>
<tr ><td></td><td colspan="2"><?php echo $fileuploaded;?></td></tr>
<tr ><td></td><td colspan="2"><?php echo $success;?></td></tr>
    </table>
 <!-- photo of pet:<button name="upload" value="upload" ></button>-->
    
    
</form>
    </body>
   
</html>

<?php get_footer();?>