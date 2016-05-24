<?php

/**
 * Template Name:status
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */
get_header();
session_start();

if('POST' !== $_SERVER['REQUEST_METHOD'])
 {
    $SESSION['owner_id']=""; 
    $SESSION['email_id']="";
    $SESSION['q_no']="";
     $SESSION['q_answer']="";
     $errEmail="";
     $errOQuestion="";
     $errOAnswer="";
      $_SESSION['flag']="false";
 }

/*if(!empty($_POST['change_status']))
{
    $id=$_POST['petid'];
} */
if(!empty($_POST['submit']))
{ 
    extract($_POST);
     //validation for email
    // Email mask
  if (preg_match("/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*\.[a-z]{2,3}$/i",$_POST["email_id"]) === 0) {
    $errEmail = '<p class="errText">Email must comply with this mask: chars(.chars)@chars(.chars).chars(2-4)</p>';
    }
    //validate question
     if($_POST['question']=="")
    {
        $errOQuestion='<p class="errText">please select a security question</p>';
    }
   //validate answer
     if(preg_match("/^[a-zA-Z ]+$/", $_POST["answer"])===0)
    {
        $errOAnswer='<p class="errText">Answer should contain only alphabets and space <p>';
    }
    $id=$_POST['pet_id'];
    
    extract($_POST);
    global $wpdb;
    //get owner id from wp_ju_missingpets table
  $pet_data=$wpdb->get_results("select owner_id from wp_ju_missingpets where pet_id=$id");
  foreach($pet_data as $pet_data)
  {
      $SESSION['owner_id']=$pet_data->owner_id;
  }
  $owner_id=$SESSION['owner_id'];
  //select owner details from wp_ju_petowner_info
  $owner_data=$wpdb->get_results("select owner_email_id , owner_q_no , owner_q_answer from wp_ju_petowner_info where owner_id='$owner_id'");
foreach($owner_data as $a=>$b)
{
$SESSION['email_id'] = $b->owner_email_id;

$SESSION['q_no']= $b->owner_q_no;
 $SESSION['q_answer']= $b->owner_q_answer; 
}
    $petsts=$wpdb->get_results("select pet_status from wp_ju_missingpets where pet_id=$id");
    foreach($petsts as $p=>$q)
    {
       $ps= $q->pet_status;
    }
    //match the info from table with form info
if($SESSION['email_id']===$_POST['email_id'] && $SESSION['q_no']===$_POST['question'] && $SESSION['q_answer']===$_POST['answer'])
    {
        $flag;
        //change the status of pet
        if($ps==0)
        {
            $flag="found";
            $result = $wpdb->update( 'wp_ju_missingpets', array( 'pet_status' => 1 ), array( 'owner_id' => $SESSION['owner_id'] ) );
        }
        if($ps==1)
        {
            $flag="missing";
         $result = $wpdb->update( 'wp_ju_missingpets', array( 'pet_status' => 0), array( 'owner_id' => $SESSION['owner_id'] ) );
        }
    }
    
    if($result===1)
    {  $_SESSION['flag']="true";
        if($flag==="found")
        {
        $success= "<span>status updated to found successfully<span>";
        }
         if($flag==="missing")
        {
         $success= "<span>status updated to missing successfully<span>";
        }
          echo "<script type=\"text/javascript\">
                      setTimeout(\"location.href = 'http://localhost/jeev-uthan/?page_id=145';\",3000);
                     </script>";
    }
 else {
    $fail="<span class=\"errText\">invalid information submitted</span> ";   
    }
    session_destroy();
}  
?>
<html><head>
    <body>
        <form action="" method="POST" style="margin-top: 450px;position: absolute;margin-left: 300px;">
            <table>
                <tr><td colspan="3"><?php if($success!==""){echo $success;}?></td></tr
                 <tr><td colspan="3"><?php if($fail!==""){echo $fail;}?></td></tr>
                <tr>
                    <td colspan="3"><h1>Verify Owner</h1></td> 
                    
                </tr>
               <tr>
                    <td colspan="3">(fields marked as <span class="errText">*</span> are required)</td> 
                    
                </tr>
                <tr>
                    <td colspan="2"><span class="errText">*</span>Email id:</td><td><input type="text" name="email_id"  placeholder="john.12son@gmail.com" value="<?php if($_SESSION['flag']===false){echo $_POST['email_id'];}?>"></td></tr>
                <tr><td></td><td colspan="2"><?php if($errEmail!==""){echo $errEmail;}?></td></tr>
                <tr>
                    
                    <td colspan="2"><span class="errText">*</span>Security Question:</td><td><select name="question"  id="question" style="width:173px;"><option value="" >select</option>
            <option value="0">What is your best friend's name?</option>
            <option value="1">What is your home town?</option>
            <option value="2">Name of your favourite book?</option>
            <option value="3">What is your hobby?</option>
            <option value="4">Who is your ideal person?</option>
            </select><script type="text/javascript">
                document.getElementById('question').value = "<?php if($_SESSION['flag']===false){echo $_POST['question'];}?>";
            </script></td></tr>
            <tr>
                <td></td><td colspan="2"><?php if($errOQuestion!==""){echo $errOQuestion;}?></td></tr>
            <tr><td><span class="errText">*</span>Answer of above question:</td><td><td><input type="text" name="answer" placeholder="only alphabets" value="<?php if($_SESSION['flag']===false){echo $_POST['answer'];}?>"></td></tr>
                <tr><td></td><td colspan="2"><?php if($errOAnswer!==""){echo $errOAnswer;}?></td></tr>
                <tr><td colspan="3"><input type="submit" name="submit" value="Change status"></td></tr>
    <input type="hidden" name="pet_id" value="<?= $_POST['petid'] ?>" />
            </table>
        </form>
    </body>
    </head></html>
<?php

?>
