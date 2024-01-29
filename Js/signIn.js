let userArray = [];
let validateEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

if (localStorage.JumiaUsers) {
  userArray = JSON.parse(localStorage.getItem("JumiaUsers"));
}

const signup = () => {
  if (!$("#firstName").val()  || !$("#mail").val()  || !$("#pw").val() || !$("#cpw").val()) {
    Swal.fire({
      icon: 'info',
      title: 'Fill in all the required fields.',
      confirmButtonColor: "#2B7EFA"
    });
  } else if (!validateEmail.test($("#mail").val())) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Email Address',
      confirmButtonColor: "#2B7EFA"
    });
  } else if ($("#cpw").val() !== $("#pw").val()) {
    $("#cpw").addClass("is-invalid");
    Swal.fire({
      icon: 'error',
      title: 'Password does not match',
      confirmButtonColor: "#2B7EFA"
    });
  } else {
    $(".text-danger").text("");

    $("#mail").removeClass("is-invalid");

    const userDetails = {
      firstName: $("#firstName").val(),
     
      email: $("#mail").val(),
      
      password: $("#pw").val(),
      ConPassword: $("#cpw").val(),
    };

    const userExist = userArray.find((user, idx) => (
      user.email == $("#mail").val()
    ));

    if (userExist) {
      Swal.fire({
        icon: 'error',
        title: 'Email already exists',
        confirmButtonColor: "#2B7EFA"
      });
    } else {
      userArray.push(userDetails);
      localStorage.setItem("JumiaUsers", JSON.stringify(userArray));
      Swal.fire({
        icon: 'success',
        title: 'Sign up successful!',
        text: 'Log in to continue',
        confirmButtonColor: "#2B7EFA"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "../html/jumia.html";
        }
      });
    }
  }
};

const signInUser = () => {
  let otcaUsers = JSON.parse(localStorage.getItem("JumiaUsers"));
  let found = false;
  if (otcaUsers) {
    $.each(otcaUsers, (index, user) => {
      if (user.email == $("#usermail").val() && user.password == $("#userpw").val()) {
        found = true;
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });

        Toast.fire({
          icon: 'success',
          title: 'Sign in successful'
        });
        setTimeout(() => {
          localStorage.setItem("jumiaCurrentUserIndex", index);
          window.location.href = "../html/jumia.html";
        }, 1500);
      }
    });
  }

  if (!found) {
    Swal.fire({
      icon: 'error',
      title: 'Incorrect email or password',
      confirmButtonColor: "#2B7EFA"
    });
  }
};

// Navbars
let navbars = JSON.parse(localStorage.getItem("Navbars"));
$.each(navbars, (index, eachItem) => {
  $("#displayLargeNavbar").html(eachItem.largeDeviceNav);
  $("#displaySmallNavbar").html(eachItem.smallDeviceNav);
  $("#displaySmfooter").html(eachItem.smallDeviceFooter);
  $("#offcanvasExample").html(eachItem.offCanvasMenu);
});

let JumiaCurrentUserIndex = localStorage.getItem("jumiaCurrentUserIndex");
let JumiaUsers = JSON.parse(localStorage.getItem("JumiaUsers"));
if (JumiaUsers) {
  if (JumiaCurrentUserIndex) {
    console.log(JumiaUsers[jumiaCurrentUserIndex]);
    $(".signInChange").html(`
      <b><i class="bi bi-person-fill-check fs-5"></i> Hi, ${JumiaUsers[jumiaCurrentUserIndex].firstName}</b>
    `);
    $(".logOutChange").html(`
      <b class="w-100 fs-5" style="color:  #f68b1e; cursor:pointer;" onclick="logOutUser()">LOGOUT</b>
    `);
  }
}

const logOutUser = () => {
  localStorage.removeItem('jumiaCurrentUserIndex');
  window.location.href = "../html/signin.html";
};