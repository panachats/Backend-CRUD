// แบบ XMLttpRequest
document.addEventListener("DOMContentLoaded", function () {
  const xhttp = new XMLHttpRequest()
  xhttp.open("GET", "http://localhost:3000/getEmpData")
  xhttp.send()
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log("Success");
      const data = JSON.parse(this.responseText)
      if (data.error == false) {// เช็คว่าข้อมูลที่ได้รับไม่มี error จาก data.error
        document.querySelector(".table tbody").innerHTML = ""; // เคลียร์เนื้อหาของ tbody ของตารางใน HTML Document ก่อนที่จะแสดงข้อมูลล่าสุด
        data.data.forEach(employee => {
          console.log(employee)
          const tr = "<tr><td>" + employee.EmpID +
            "</td><td>" + employee.EmpName +
            "</td><td>" + employee.EmpLastname +
            "</td><td>" + employee.EmpAge +
            "</td><td>" + employee.EmpAdress +
            "</td><td>" + employee.EmpSalary +
            "</td><td>" + employee.EmpPositon +
            '</td><td><button onclick="editData(' + employee.id + ')" data-bs-toggle="modal" data-bs-target="#EditModal" data-bs-whatever="@mdo"><i class="fas fa-fw fa-cog "></i></button>' +
            '<button onclick="deleteData(' + employee.id + ')"><i class="fas fa-trash"></i></button></td>' +
            "</tr>";
          document.querySelector(".table tbody").innerHTML += tr;
        });
      }
    } else {
      console.log("get json Fail");
    }
  }
})

// แบบ Fetch
document.addEventListener("DOMContentLoaded", function () { //สร้าง Event Listener ที่รอให้ HTML Document โหลดเสร็จก่อนที่จะดำเนินการต่อไป
    fetch("http://localhost:3000/getEmpData") //  เรียกใช้ fetch API เพื่อดึงข้อมูลจาก URL 
      .then(response => response.json()) // แปลงข้อมูล response ที่ได้รับจาก fetch ให้กลายเป็น JSON
      .then(data => { // จัดการข้อมูล JSON ด้วย function ที่รับ parameter เป็น data
        console.log("Success");
        if (data.error == false) { // เช็คว่าข้อมูลที่ได้รับไม่มี error จาก data.error
          document.querySelector(".table tbody").innerHTML = ""; // เคลียร์เนื้อหาของ tbody ของตารางใน HTML Document ก่อนที่จะแสดงข้อมูลล่าสุด
          data.data.forEach(employee => { //ใช้ forEach loop เพื่อวนลูปผ่าน employee ที่ได้รับจากข้อมูล JSON แต่ละตัว
            console.log(employee);
            const tr = "<tr><td>" + employee.EmpID + //สร้างตัวแปร tr ที่เป็น HTML string สำหรับแสดงข้อมูล employee ในแต่ละแถวของตาราง
              "</td><td>" + employee.EmpName +
              "</td><td>" + employee.EmpLastname +
              "</td><td>" + employee.EmpAge +
              "</td><td>" + employee.EmpAdress +
              "</td><td>" + employee.EmpSalary +
              "</td><td>" + employee.EmpPositon +
              '</td><td><button onclick="editData(' + employee.id + ')" data-bs-toggle="modal" data-bs-target="#EditModal" data-bs-whatever="@mdo"><i class="fas fa-fw fa-cog "></i></button>' +
              '<button onclick="deleteData(' + employee.id + ')"><i class="fas fa-trash"></i></button></td>' +
              "</tr>";
            document.querySelector(".table tbody").innerHTML += tr; //แทรกตัวแปร tr ลงใน tbody ของตารางใน HTML Document เพื่อแสดงข้อมูล employee ในตาราง
          });
        }
      })
      .catch(error => {
        console.log("get json Fail");
      });
  });
