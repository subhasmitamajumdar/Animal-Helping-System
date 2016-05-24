<?php

/**
 * Template Name: Reg
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */
//get_header();
session_start();
if('POST' !== $_SERVER['REQUEST_METHOD'])
{

$_SESSION['flag']=false;
$_SESSION['o1flag']=false;
$_SESSION['count']=false;
$_SESSION['oflag']=false;
$errName="";
$errNameSize="";
}
?>
<?php
    if($_REQUEST['submit'])
      { 
            if(preg_match("/^[a-zA-Z][a-zA-Z ]+$/", $_POST["n_name"]) === 0 /*||  preg_match("/^[A-Z][a-zA-Z ]$/",$_POST["pet_name"])===0*/)
            {
             $errName='<p>Name must be in form of letters,and must not start with a space</p>';
            }
            if(strlen($_POST["n_name"])<3||strlen($_POST["n_name"])>100)
            {
             $errNameSize='<p>your ngo name must be between 3 to 100 characters</p>'; 
            }
           
           if(($_POST['Location'])!=="" )
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
            
           
             /*if(($_POST['n_name'])!== "" && ($_POST['n_add'])!== "")
             {
                 extract($_POST);
                //link columns with form data
                $ngo_data=array('ngo_name'=>$n_name,
                    'ngo_address'=>$n_add,
                    'ngo_contact_no1'=>$n_contact1,
                    'ngo_contact_no2'=>$n_contact2,
                    'ngo_contact_no3'=>$n_contact3,
                    'ngo_email'=>$n_email,
                    'ngo_website'=>$n_website,
                        'ngo_location_id'=>$ver);
                global $wpdb;
                //$wpdb->insert('wp_ju_ngo_info',$ngo_data);
                $dataentry=$wpdb->insert('wp_ju_ngo_info',$ngo_data);
                if($dataentry===1)
                {
                       $_SESSION['flag']=true;            
                }
              }*/
             
        
               // echo $_POST['othertext'];
         if(($_SESSION[o1flag]===true) || ($_RESUEST['other']))
         {
             if(($_POST['Location'])!=="" && $_POST['othertext']!=="")
           {
            echo 'you can not give 2 locations ';

           }
            if(($_POST['othertext'])!=="" && ($_POST['Location'])==="")
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
             /*       $new_loc=array('location_name'=>$otherloc);
                $newlocenter =$wpdb->insert('wp_ju_location',$new_loc);*/
                  $ver = $v->location_id."<br>";
                  }  
                    
            }
         }
        
           
        if($_SESSION['count']===true && empty($errName) && empty($errNameSize))
            {
              
                    extract($_POST);
                    //link columns with form data
                    $ngo_data=array('ngo_name'=>$n_name,
                    'ngo_address'=>$n_add,
                    'ngo_contact_no1'=>$n_contact1,
                    'ngo_contact_no2'=>$n_contact2,
                    'ngo_contact_no3'=>$n_contact3,
                    'ngo_email'=>$n_email,
                    'ngo_website'=>$n_website,
                        'ngo_location_id'=>$ver);
                     global $wpdb;
                    
                     $dataentry=$wpdb->insert('wp_ju_ngo_info',$ngo_data);
                     if($dataentry===1)
                     {
                       $_SESSION['flag']=true; 
                      
                       wp_redirect("http://localhost/jeev-uthan/?page_id=91");
                     }
                     
            }
             if($_SESSION['count']===false)
             {
             echo 'entry can not be done ,either select location or enter new location'; 
             }
            
            
     } ?>
<html>
    <body>
    <form method="POST" style="margin-left: 500px" >
    <table border="0px">
   

    <tr><td colspan="3"><h3>NGO Registration</h3></td></tr>
    <tr><td>Name: </td> <td colspan="2"><input type ="text" name="n_name" required="required" placeholder="First letter capital" value="<?php if($_SESSION['flag']===false){echo $_POST['n_name'];}?>"></td><td><?php if($errName!==""){echo $errName;}?></td><td><?php if($errNameSize!==""){echo $errNameSize;}?></td></tr>
    <tr><td>Address:</td><td colspan="2"> <input type="text" name="n_add" value="<?php if($_SESSION['flag']===false){echo $_POST['n_add'];}?>"></td></tr>
    <tr><td>contact no1:</td><td colspan="2"><input type="text" id="mobile-number" placeholder="" name="n_contact1" size="13" length="11"></td></tr>
    <tr><td>contact no2:</td><td colspan="2"><input type="text" id="mobile-number" placeholder="" name="n_contact2" size="13" length="11"></td></tr>
    <tr><td>contact no3:</td><td colspan="2"><input type="text" id="mobile-number" placeholder="" name="n_contact3" size="13" length="11"></td></tr>
    <tr><td> Email id:</td><td colspan="2"> <input type="email" name="n_email"></td></tr>
    <tr><td> WebSite :</td><td colspan="2"><input type="text" name="n_website"></td></tr>
    <tr><td colspan="3"><input type="submit" name="submit"></td></tr>
    
 <!-- photo of pet:<button name="upload" value="upload" ></button>-->
    <tr>
    <td>nearby location of NGO</td>
        <?php
         global $wpdb; 
         $qu = $wpdb->get_results("SELECT location_name FROM wp_ju_location");
        ?>
    <td><select name="Location" id="location">
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
        </select>
        
    <input type="submit" name="other" value="other">
    <?php if($_REQUEST['other'])
    {
        $_SESSION['oflag']=true;

        extract($_POST);
        
        if(($_POST['Location'])!=="")
        {
            echo 'you have already choose the location';
        }
 else {
        if($_SESSION['oflag']===true){?><input type ="text" name="othertext" value="<?php echo $_POST['othertext'];?>">
            <?php
            $_SESSION['o1flag']=true;
          
        }
        }
           
 
        
     }?>
      </td></tr>
    
</table> 
</form>
</body>
</html>