{\rtf1\ansi\ansicpg1252\deff0{\fonttbl{\f0\fnil\fcharset0 Courier New;}}
{\*\generator Msftedit 5.41.21.2510;}\viewkind4\uc1\pard\lang1033\f0\fs22 <<<<<<< HEAD\par
=======\par
# Jeevuthan\par
minor project of 6th sem\par
\par
>>>>>>> 83136c80cdd4024d650f9fd054d55c2ed8f6179b\par
JEEVUTHAN DATABASE DOCUMENTATION\par
====================================\par
\par
\par
\par
CONVENTIONS USED:\par
===============\par
\tab *All headings are in 'uppercase' and 'underlined'\par
\tab *Entities are denoted with 'Uppercase'\par
\tab *'//' are used for comments\par
\tab * '**' denotes required fields\par
\tab *'uppercase' & '->' is used to depict primary key\par
\tab * foreign keys are \ul underlined\par
\ulnone\par
\tab\par
\tab\tab\par
BUSINESS RULES\par
===============\par
\tab *One User can give one location about the place where he finds injured animal.\par
\tab *A user can give information about one or more missing pet.\par
\tab *Loation of user is used as a foreign key for NGO and Vets information.\par
\par
\par
JU_ADMIN //contains the admin who can enter in database\par
================\par
\tab ->ADMIN_ID\par
\tab **admin_username**\par
     **admin_password**\par
\par
\par
\par
\par
JU_LOCATION //\tab contains the location of user where he finds injured animal\par
================\par
\tab ->LOCATION_ID\par
\tab **Location name**\par
\par
\par
\par
JU_NGO_INFO   //contains info about NGOs present nearby\par
===========\par
\tab\par
\tab ->NGO_ID\par
\tab **\ul Location_id\ulnone **\par
\tab **NGO_name**\par
\tab **NGO_Address**\par
\tab **NGO_Contact_num1\par
\tab *NGO_Contact_num2\par
\tab *NGO_Contact_num3\par
\tab *NGO_email\par
\tab *NGO_website\par
\tab\par
JU_VETS_INFO   //contains info about Veterinary doctors present near user's location \par
============\par
\par
\tab ->VET_ID\par
\tab **\ul Location_id\ulnone **\par
\tab **Vet_name**\par
\tab **Vet_address**\par
\tab **Vet_contact_num1**\par
\tab *Vet_contact_num2\par
\tab *Vet_contact_num3\par
\tab *vet_email\par
\tab *vet_website\par
\tab\par
JU_PET_OWNER_INFO   //The person who lost his pet his info is stored in this table\par
=======================\par
\par
\tab ->OWNER_ID\par
\tab\par
\tab **Owner_name**\par
\tab *Owner_phone_No\par
\tab **owner_contact_cc**\par
\tab *Owner_address\par
\tab *Owner_city\par
\tab **Owner_email_Id**\par
\tab\par
\tab\par
\tab\par
\par
\par
JU_MISSING_PETS //All pet related info is stored in this table\par
===============\par
\par
\tab ->PET_ID\par
\tab **\ul OWNER_ID\ulnone **\par
\tab *Pet_name\par
\tab *Pet_photo//stores path of image\par
\tab *Pet_photo_uploaded_on\par
\tab *Pet_type // which is the type of animal(eg:dog,cat,cow etc)\par
\tab *Pet_missing_date\par
\tab *Pet_status//pet found or not\par
\tab *Pet_height\par
\tab *Pet_breed\par
\tab *Pet_color\par
\tab **pet_location** \par
<<<<<<< HEAD\par
\tab\par
=======\par
\tab\par
>>>>>>> 83136c80cdd4024d650f9fd054d55c2ed8f6179b\par
\par
}
 