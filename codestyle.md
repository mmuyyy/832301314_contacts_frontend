前端代码风格规范



参考标准



• CSS：遵循 Airbnb CSS 规范



• JavaScript：遵循 Airbnb JavaScript 规范



命名规则



1\. 文件名：小写字母+短横线（如 style.css、script.js、index.html）



2\. CSS 相关：



◦ 类名：小写字母+短横线（如 .container、.form-group、.contact-item、.delete-btn）



◦ ID 名：小写字母+小驼峰（如 #editModal、#contactsContainer、#editId、#editName）



3\. JavaScript 相关：



◦ 变量名：小驼峰（如 contactId、name、phone）



◦ 函数名：小驼峰（如 loadContacts、openEditModal、submitEdit、deleteContact）



◦ 事件处理函数：小驼峰（如 contactForm 表单的 submit 监听函数）



注释要求



1\. 关键功能函数需添加功能说明注释



2\. 复杂逻辑或接口请求部分需添加步骤注释



3\. 外部文件引用处需添加简要说明（如 CSS/JS 引入注释）



格式规范



1\. CSS 格式：



◦ 选择器后换行，属性缩进 2 个空格



◦ 属性按“布局→盒模型→样式”顺序排列



◦ 末尾不保留多余空行



2\. JavaScript 格式：



◦ 代码缩进 2 个空格



◦ 函数定义后保留 1 个空行



◦ 条件判断、循环语句的大括号单独换行



◦ fetch 请求按“method→headers→body”顺序排列，换行对齐



代码示例



CSS 示例

.container {

&nbsp; max-width: 500px;

&nbsp; margin: 0 auto;

&nbsp; padding: 20px;

}



.form-group {

&nbsp; margin-bottom: 15px;

}



input {

&nbsp; width: 100%;

&nbsp; padding: 10px;

&nbsp; border: 1px solid #ddd;

&nbsp; border-radius: 4px;

}



button {

&nbsp; padding: 10px 20px;

&nbsp; background: #666;

&nbsp; color: #fff;

&nbsp; border: none;

&nbsp; border-radius: 4px;

&nbsp; cursor: pointer;

}



.contact-list {

&nbsp; margin-top: 30px;

}



.contact-item {

&nbsp; display: flex;

&nbsp; justify-content: space-between;

&nbsp; align-items: center;

&nbsp; padding: 10px 0;

&nbsp; border-bottom: 1px solid #eee;

}



.delete-btn {

&nbsp; background: #f44336;

&nbsp; color: #fff;

&nbsp; padding: 5px 10px;

&nbsp; font-size: 12px;

}

JavaScript 示例

/\*\*

&nbsp;\* 加载所有联系人并渲染到列表

&nbsp;\* 功能：调用后端 GET /get\_contacts 接口，处理返回数据并生成联系人项

&nbsp;\*/

function loadContacts() {

&nbsp; const container = document.getElementById('contactsContainer');

&nbsp; fetch('http://127.0.0.1:5000/get\_contacts', { method: 'GET' })

&nbsp;   .then(res => res.json())

&nbsp;   .then(res => {

&nbsp;     container.innerHTML = '';

&nbsp;     if (res.code !== 200) {

&nbsp;       container.innerHTML = `<p>加载失败：${res.message}</p >`;

&nbsp;       return;

&nbsp;     }

&nbsp;     const contacts = res.data;

&nbsp;     if (contacts.length === 0) {

&nbsp;       container.innerHTML = '<p>暂无联系人，添加后会显示在这里</p >';

&nbsp;       return;

&nbsp;     }

&nbsp;     // 循环渲染联系人项

&nbsp;     contacts.forEach(contact => {

&nbsp;       const item = document.createElement('div');

&nbsp;       item.className = 'contact-item';

&nbsp;       item.innerHTML = `

&nbsp;         <div>姓名：${contact.name} | 电话：${contact.phone}</div>

&nbsp;         <div>

&nbsp;           <button onclick="openEditModal(${contact.id})" style="background: #2196F3; color: #fff; padding: 5px 10px; font-size: 12px; margin-right: 5px;">修改</button>

&nbsp;           <button class="delete-btn" onclick="deleteContact(${contact.id})">删除</button>

&nbsp;         </div>

&nbsp;       `;

&nbsp;       container.appendChild(item);

&nbsp;     });

&nbsp;   })

&nbsp;   .catch(err => {

&nbsp;     container.innerHTML = `<p>加载失败：${err}</p >`;

&nbsp;   });

}



/\*\*

&nbsp;\* 打开修改联系人弹窗

&nbsp;\* 功能：根据联系人ID调用后端接口，获取详情并填充到弹窗表单

&nbsp;\* @param {number} contactId - 联系人ID

&nbsp;\*/

function openEditModal(contactId) {

&nbsp; fetch(`http://127.0.0.1:5000/get\_contact/${contactId}`, { method: 'GET' })

&nbsp;   .then(res => res.json())

&nbsp;   .then(res => {

&nbsp;     if (res.code === 200) {

&nbsp;       const contact = res.data;

&nbsp;       document.getElementById('editId').value = contact.id;

&nbsp;       document.getElementById('editName').value = contact.name;

&nbsp;       document.getElementById('editPhone').value = contact.phone;

&nbsp;       document.getElementById('editModal').style.display = 'block';

&nbsp;     } else {

&nbsp;       alert(res.message);

&nbsp;     }

&nbsp;   })

&nbsp;   .catch(err => {

&nbsp;     alert('加载联系人失败：' + err);

&nbsp;   });

}



/\*\*

&nbsp;\* 关闭修改联系人弹窗

&nbsp;\* 功能：隐藏弹窗，清空表单内容（可选）

&nbsp;\*/

function closeEditModal() {

&nbsp; document.getElementById('editModal').style.display = 'none';

}



/\*\*

&nbsp;\* 提交修改联系人信息

&nbsp;\* 功能：获取弹窗表单数据，调用后端 PUT 接口完成修改

&nbsp;\*/

function submitEdit() {

&nbsp; const id = document.getElementById('editId').value;

&nbsp; const name = document.getElementById('editName').value;

&nbsp; const phone = document.getElementById('editPhone').value;

&nbsp; 

&nbsp; fetch(`http://127.0.0.1:5000/update\_contact/${id}`, {

&nbsp;   method: 'PUT',

&nbsp;   headers: { 'Content-Type': 'application/json' },

&nbsp;   body: JSON.stringify({ name, phone })

&nbsp; })

&nbsp;   .then(res => res.json())

&nbsp;   .then(data => {

&nbsp;     alert(data.message);

&nbsp;     if (data.code === 200) {

&nbsp;       closeEditModal();

&nbsp;       loadContacts();

&nbsp;     }

&nbsp;   })

&nbsp;   .catch(err => {

&nbsp;     alert('修改失败：' + err);

&nbsp;   });

}



/\*\*

&nbsp;\* 删除联系人

&nbsp;\* 功能：确认后调用后端 DELETE 接口，删除指定ID的联系人

&nbsp;\* @param {number} contactId - 联系人ID

&nbsp;\*/

function deleteContact(contactId) {

&nbsp; if (confirm('确定要删除吗？')) {

&nbsp;   fetch(`http://127.0.0.1:5000/delete\_contact/${contactId}`, { method: 'DELETE' })

&nbsp;     .then(res => res.json())

&nbsp;     .then(data => {

&nbsp;       alert(data.message);

&nbsp;       loadContacts();

&nbsp;     })

&nbsp;     .catch(err => {

&nbsp;       alert('删除失败：' + err);

&nbsp;     });

&nbsp; }

}



// 页面加载完成后自动加载联系人列表

window.onload = function() {

&nbsp; loadContacts();

&nbsp; 

&nbsp; // 绑定添加联系人表单提交事件

&nbsp; document.getElementById('contactForm').addEventListener('submit', function(e) {

&nbsp;   e.preventDefault();

&nbsp;   const name = document.getElementById('name').value;

&nbsp;   const phone = document.getElementById('phone').value;

&nbsp;   

&nbsp;   fetch('http://127.0.0.1:5000/add\_contact', {

&nbsp;     method: 'POST',

&nbsp;     headers: { 'Content-Type': 'application/json' },

&nbsp;     body: JSON.stringify({ name, phone })

&nbsp;   })

&nbsp;     .then(res => res.json())

&nbsp;     .then(data => {

&nbsp;       alert(data.message);

&nbsp;       if (data.code === 200) {

&nbsp;         this.reset();

&nbsp;         loadContacts();

&nbsp;       }

&nbsp;     })

&nbsp;     .catch(err => {

&nbsp;       alert('添加失败：' + err);

&nbsp;     });

&nbsp; });

};

