<?php
/**
 * Template Name: redirecting
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */
get_header(); ?>
<?php
if(isset($_REQUEST['vet']))
{
 wp_redirect('http://localhost/jeev-uthan/?page_id=142');   
}
if(isset($_REQUEST['ngo']))
{
 wp_redirect('http://localhost/jeev-uthan/?page_id=91');   
}
?>
<html>
<head> </head>
    <body>
        <form action="" method="POST" style="margin-left: 350px" >
    <table border="0px">
        <tr><td colspan="3"><h3>Veterinary registration</h3></td></tr>
        <tr><td colspan="3"><input type ="submit" name="vet" value="Register Veterinary"></td></tr>
        <tr><td colspan="3"><h3>NGO registration</h3></td></tr> 
        <tr><td colspan="3"><input type ="submit" name="ngo" value="Register NGO"></td></tr>
            
    </table>
    </form>
            </body>
            </html>