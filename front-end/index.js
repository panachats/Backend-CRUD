const userdata = {
  "Username": "admin",
  "Password": "admin@min"
};

function getEmpData() {

  fetch('http://localhost:3000/getEmpData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userdata)
  })
    .then(response => response.json())
    .then(datas => {
      console.log(datas);
      const table = document.querySelector('table tbody');
      table.innerHTML = '';
      let tr = ''
      datas.data.forEach(employee => {
        console.log(employee);
        let active = "ไม่ใช้งาน";
        if (employee.Activeflag == 1) { active = "ใช้งาน"; }

        tr += ` <tr>
                <td>${employee.EmpID}</td>
                <td>${employee.EmpName}</td>
                <td>${employee.EmpLastname}</td>
                <td>${employee.EmpAge}</td>
                <td>${employee.EmpAddress}</td>
                <td>${employee.EmpSalary}</td>
                <td>${employee.EmpPosition}</td>
                <td>${active}</td>
                
                <td>
                <button type="button" class="btn btn-info" onclick="EditShowBoxData(${employee.EmpID})">
                <i class="fa-solid fa-pen text-white"></i>
                </button>
                <button class="btn btn-danger" onclick="DeleteBox(${employee.EmpID})">
                <i class="fas fa-trash"></i>
                </button>
                </td>
                </tr>
                `;
        // console.log(tr)
        document.querySelector('table tbody').innerHTML = tr

      });
      document.querySelector('#role').innerHTML = datas.role

    })
    .catch(error => {
      console.log("get json Fail", error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  getEmpData();
});





// function getDoctorsData() {
//   let userdata = {
//     "username": "admin",
//     "password": "admin@min"
//   }
//   $.ajax({
//     method: "POST",
//     url: "http://localhost:3000/getEmpData",
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     contentType: 'application/x-www-form-urlencoded; charset=utf-8',
//     data: userdata
//   })
//   .done(function (datas) {
//     console.log(datas)
//     $("table tbody").empty();
//     datas.data.forEach(employee => {
//       console.log(employee);
//       let active = "ไม่ใช้งาน";
//       if (employee.Activeflag == 1) { active = "ใช้งาน"; }
//       const tr = `
//                 <tr>
//                 <td>${employee.EmpID}</td>
//                 <td>${employee.EmpName}</td>
//                 <td>${employee.EmpLastname}</td>
//                 <td>${employee.EmpAge}</td>
//                 <td>${employee.EmpSalary}</td>
//                 <td>${employee.EmpPosition}</td>
//                 <td>${active}</td>
//                 <td>
//                 <button class="btn btn-info" onclick="EditShowBoxData(${employee.EmpID})" data-bs-toggle="modal" data-bs-target="#EditModal" data-bs-whatever="@mdo">
//                 <i class="fas fa-fw fa-cog text-white"></i>
//                 </button>
//                 <button class="btn btn-danger" onclick="DeleteBox(${employee.EmpID})">
//                 <i class="fas fa-trash"></i>
//                 </button>
//                 </td>
//                 </tr>
//                 `;
//       $("table tbody").append(tr);
//     });
//   })
//   .fail(function(error) {
//     console.log("get json Fail", error);
//   });
// }

// $(document).ready(function () {
//   getDoctorsData();

//   $('table').DataTable();
// });



function CreateBox() {
  Swal.fire({
    title: 'Create Employee Data',
    html:
      '<div class="mb-3"><label for="First_Name" class="form-label">First Name</label>' +
      '<input class="form-control" id="First_Name" placeholder="First Name"></div>' +

      '<div class="mb-3"><label for="Last_Name" class="form-label">Last Name</label>' +
      '<input class="form-control" id="Last_Name" placeholder="Last Name"></div>' +

      '<div class="mb-3"><label for="Age" class="form-label">Age</label>' +
      '<input class="form-control" id="Age" placeholder="Age"></div>' +

      '<div class="mb-3"><label for="Address" class="form-label">Address</label>' +
      '<input class="form-control" id="Address" placeholder="Address"></div>' +

      '<div class="mb-3"><label for="Salary" class="form-label">Salary</label>' +
      '<input class="form-control" id="Salary" placeholder="Salary"></div>' +

      '<div class="mb-3"><label for="Position" class="form-label">Position</label>' +
      '<input class="form-control" id="Position" placeholder="Position"></div>',
    focusConfirm: false,
    preConfirm: () => {
      CreateData();
    }
  });
}

async function CreateData() {

  console.log('function CreateData() is called');

  const FirstName = document.getElementById("First_Name").value
  const LastName = document.getElementById("Last_Name").value
  const Age = document.getElementById("Age").value
  const Address = document.getElementById("Address").value
  const Salary = document.getElementById("Salary").value
  const Position = document.getElementById("Position").value

  try {
    const response = await fetch("http://localhost:3000/postEmpData", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, /',
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        EmpName: FirstName,
        EmpLastname: LastName,
        EmpAge: Age,
        EmpAddress: Address,
        EmpSalary: Salary,
        EmpPosition: Position,
        ...userdata
      })
    });
    const data = await response.json(); // parse response as JSON
    if (response.ok) {
      Swal.fire({
        title: 'Good job!',
        text: 'Create Information Successfully!',
        icon: 'success',
        focusConfirm: false,
        preConfirm: () => {
          window.location.reload()
        }
      });
      console.log(data);
      return data;
    } else {
      Swal.fire({
        title: 'Error!',
        text: data.msg || response.statusText, // display error message from server response or HTTP error message
        icon: 'error',
        focusConfirm: false,

      });
    }

  } catch (error) {
    console.log(error);
    Swal.fire({
      title: 'Error!',
      text: error.message || "Something went wrong",
      icon: 'error',
      focusConfirm: false
    });
  }
}



async function DeleteBox(EmpID) {
  console.log(EmpID)
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      DeleteData(EmpID);
    }
  })
}


async function DeleteData(EmpID) {

  console.log('function DeleteData() is called');
  console.log(EmpID)
  try {
    const response = await fetch('http://localhost:3000/deleteEmpData/' + EmpID, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userdata)
    });
    const data = await response.json();
    if (response.ok) {
      Swal.fire({
        title: 'Good job!',
        text: 'Delete Information Successfully!',
        icon: 'success',
        focusConfirm: false,
        preConfirm: () => {
          window.location.reload()
        }
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: data.msg || response.statusText, // display error message from server response or HTTP error message
        icon: 'error',
        focusConfirm: false
      });
    }

  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: error.message || "Something went wrong", // display error message from server response or HTTP error message
      icon: 'error',
      focusConfirm: false
    });
  }
}



async function EditShowBoxData(EmpID) {

  console.log('function EditShowBoxData() is called');
  console.log(EmpID);
  try {
    const response = await fetch('http://localhost:3000/showEmpData/' + EmpID, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userdata)
    });
    const data = await response.json();
    const res = await data.data[0];
    Swal.fire({
      title: 'Create Employee Data',
      html:
        '<input class="form-control" id="Edit_id" type="hidden" value="' + (res['EmpID'] || '') + '"></div>' +
        '<div class="mb-3"><label for="Edit_First_Name" class="form-label">First Name</label>' +
        '<input class="form-control" id="Edit_First_Name" placeholder="First Name" value="' + (res['EmpName'] || '') + '"></div>' +
        '<div class="mb-3"><label for="Edit_Last_Name" class="form-label">Last Name</label>' +
        '<input class="form-control" id="Edit_Last_Name" placeholder="Last Name" value="' + (res['EmpLastname'] || '') + '"></div>' +
        '<div class="mb-3"><label for="Edit_Age" class="form-label">Age</label>' +
        '<input class="form-control" id="Edit_Age" placeholder="Age" value="' + (res['EmpAge'] || '') + '"></div>' +
        '<div class="mb-3"><label for="Edit_Adress" class="form-label">Adress</label>' +
        '<input class="form-control" id="Edit_Address" placeholder="Address" value="' + (res['EmpAddress'] || '') + '"></div>' +
        '<div class="mb-3"><label for="Edit_Salary" class="form-label">Salary</label>' +
        '<input class="form-control" id="Edit_Salary" placeholder="Salary" value="' + (res['EmpSalary'] || '') + '"></div>' +
        '<div class="mb-3"><label for="Edit_Position" class="form-label">Position</label>' +
        '<input class="form-control" id="Edit_Position" placeholder="Position" value="' + (res['EmpPosition'] || '') + '"></div>',
      focusConfirm: false,
      preConfirm: () => {
        EditData();
      }
    });
  }
  catch (error) {
    Swal.fire({
      title: 'Error!',
      text: error.message || "User does not have permission to create employee",
      icon: 'error',
      focusConfirm: false
    });
  }
}


async function EditData() {
  console.log('function EditData() is called');
  const EmpID = document.getElementById("Edit_id").value
  const FirstName = document.getElementById("Edit_First_Name").value
  const LastName = document.getElementById("Edit_Last_Name").value
  const Age = document.getElementById("Edit_Age").value
  const Address = document.getElementById("Edit_Address").value
  const Salary = document.getElementById("Edit_Salary").value
  const Position = document.getElementById("Edit_Position").value
  console.log(EmpID)
  try {
    const response = await fetch('http://localhost:3000/putEmpData/' + EmpID, {
      method: "PUT", headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        EmpName: FirstName,
        EmpLastname: LastName,
        EmpAge: Age,
        EmpAddress: Address,
        EmpSalary: Salary,
        EmpPosition: Position,
      })
    })

    const data = await response.json()
    if (response.ok) {
      console.log(data)
      Swal.fire({
        title: 'Good job!',
        text: 'Update Information Successfully!',
        icon: 'success',
        focusConfirm: false,
        preConfirm: () => {
          window.location.reload()
        }
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: data.msg || response.statusText, // display error message from server response or HTTP error message
        icon: 'error',
        focusConfirm: false
      });
    }

  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: error.message || "Something went wrong",
      icon: 'error',
      focusConfirm: false
    });
  }
}


