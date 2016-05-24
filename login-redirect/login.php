<?php
/**
 * Template Name: login
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */
get_header();
?>
<?php
$flag='false';
if(isset($_REQUEST['submit']))
    {
        global $wpdb;
        $admin_username=$wpdb->get_results("select admin_username from wp_ju_admin");
        $admin_password=$wpdb->get_results("select admin_password from wp_ju_admin");
        foreach($admin_username as $x=>$y)
        {
            $user=$y->admin_username;
            if($y->admin_username===$_POST['admin_username'])
            {
               foreach($admin_password as $a=>$b)
                {
                    $pass=$b->admin_password;
                    if($b->admin_password===$_POST['admin_password'])
                    {
                        $flag=true;
                        wp_redirect('http://localhost/jeev-uthan/?page_id=126');
                    }
                }
            }
        }
        if($flag==='false')
        {
            if(empty($_POST['admin_username']) || empty($_POST['admin_password']))
            {
                echo'please enter username and password';
            }
            else
            {
                echo 'invalid username or password';
            }
        }
    }
?>
<html>
<head> </head>
    <body>
        <form action="" method="POST" style="margin-left: 350px" >
    <table border="0px">
        <tr><td colspan="3"><h3>username</h3></td></tr>
        <tr><td colspan="2"><input type ="text" name="admin_username" value="<?php echo $_POST['admin_username'];?>"></tr>
        <tr><td colspan="3"><h3>password</h3></td></tr> 
        <tr><td colspan="2"><input type ="password" name="admin_password" value="<?php echo $_POST['admin_password'];?>"></tr>
            <tr ><td colspan="3"><input type="submit" name="submit" value='submit'></td></tr>
    </table>
    </form>
            </body>
            </html>


