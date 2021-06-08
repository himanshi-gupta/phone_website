/*
===================
Password Matching
===================
*/

function SubmitAlert(form)
{	
    /*
    Purpose of the function is to check if the two password entered by user are same or not
    Input:- form object
    Output:- alert mesaage
    */
    
    //p1 and p2 stores the value of form field containing the password
	p1=form.password1.value;
	p2=form.password2.value;

    //if the value match, we give an alert that sign in is successful
	if(p1==p2)	
          alert("You signed up successfully!");
    
    //if the value doesnot match, we give an alert that password doesnot match
    else
          alert("Password donot match, Try again...");
}