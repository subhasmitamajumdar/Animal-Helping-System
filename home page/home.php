<?php
/**
 * Template Name:home
 *
 */
get_header();
?>
<?php
if(isset($_REQUEST['ma']))
{
 wp_redirect('http://localhost/jeev-uthan/?page_id=145');   
}
if(isset($_REQUEST['ia']))
{
 wp_redirect('http://localhost/jeev-uthan/?page_id=76');   
}
if(isset($_REQUEST['faq']))
{
 wp_redirect('http://localhost/jeev-uthan/?page_id=2');   
}
?>

<html>
<style>
.describe
{
	background-color:#DFDFDF;
	margin-top:15px;
	width:200px;
	alignment-baseline:central;
	margin-left:50px;
}
.describe1
{
	background-color:#DFDFDF;
	margin-top:15px;
	width:500px;
	alignment-baseline:central;
	margin-left:50px;
}
#head
{
	margin-left:300px;
	font-size:50px;
}
</style>
<form action="" method="POST" style="margin-top:450px; position:absolute;">
<table style="margin-left:-100px;">

   <tr>
    <td>
        <input type="submit" value="Missing Animal" name="ma"style="width: 200px; height:50px; margin-left:50px; background-color:cyan; color:#000; font-size:25px;">
    </td>
	<td colspan="2">
            <input type="submit" value="Injured Animal" name="ia" style="width: 500px; height:50px; margin-left: 50px;background-color:#000; color:cyan; font-size:35px;">
    </td>
	
    <td>
        <input type="submit" value="FAQ" name="faq" style="width: 200px; height:50px; margin-left: 50px;background-color:cyan; color:#000; font-size:25px;">
    </td>
   </tr>
   
    <tr>
	<td><div class="describe" >Worried about your missing pet or have found an animal which you think is a pet.. </div></td>
	<td colspan="2"><div class="describe1">Had found any animal in need of treatment,an injured animal or any needy animal and want to help them..</div></td>
    <td><div class="describe">Had any querries related to the first aid of any injured animal you got..</div></td>
    </tr>
    
</table>
</form>
</html>
<div style="margin-top: 700px;position: absolute;">
<?php get_footer();?>
</div>