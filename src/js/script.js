
        // 页面加载时自动加载联系人
        window.onload = loadContacts;

        // 1. 添加联系人逻辑
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;

            fetch('http://127.0.0.1:5000/add_contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone })
            })
            .then(res => res.json())
            .then(data => {
                alert(data.message);
                document.getElementById('contactForm').reset();
                loadContacts(); // 添加后刷新列表
            })
            .catch(err => {
                alert('添加失败：' + err);
            });
        });

        // 2. 加载所有联系人
        function loadContacts() {
            const container = document.getElementById('contactsContainer');
            fetch('http://127.0.0.1:5000/get_contacts', { method: 'GET' })
            .then(res => res.json())
            .then(contacts => {
                container.innerHTML = '';

                if (contacts.length === 0) {
                    container.innerHTML = '<p>暂无联系人，添加后会显示在这里</p >';
                    return;
                }

                contacts.forEach(contact => {
                    const item = document.createElement('div');
                    item.className = 'contact-item';
                    item.innerHTML = `
                        <div>
                            姓名：${contact.name} | 电话：${contact.phone}
                        </div>
                        <div>
                            <button onclick="openEditModal(${contact.id})" style="background: #2196F3; color: #fff; padding: 5px 10px; font-size: 12px; margin-right: 5px;">修改</button>
                            <button class="delete-btn" onclick="deleteContact(${contact.id})">删除</button>
                        </div>
                    `;
                    container.appendChild(item);
                });
            })
            .catch(err => {
                container.innerHTML = `<p>加载失败：${err}</p >`;
            });
        }

        // 3. 删除联系人
        function deleteContact(contactId) {
            if (confirm('确定要删除吗？')) {
                fetch(`http://127.0.0.1:5000/delete_contact/${contactId}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    alert(data.message);
                    loadContacts(); // 删除后刷新列表
                })
                .catch(err => {
                    alert('删除失败：' + err);
                });
            }
        }

        // 4. 修改联系人逻辑
       function openEditModal(contactId) {
    // 调用后端接口，根据ID查询联系人
    fetch(`http://127.0.0.1:5000/get_contact/${contactId}`, { method: 'GET' })
    .then(res => res.json())
    .then(res => {
        if (res.code === 200) {
            const contact = res.data;
            // 把查询到的ID赋值给editId输入框
            document.getElementById('editId').value = contact.id; 
            document.getElementById('editName').value = contact.name;
            document.getElementById('editPhone').value = contact.phone;
            document.getElementById('editModal').style.display = 'block';
        } else {
            alert(res.message); // 提示“联系人不存在”
        }
    })
    .catch(err => {
        alert('加载联系人失败：' + err);
    });
}

        function closeEditModal() {
            document.getElementById('editModal').style.display = 'none';
        }

        function submitEdit() {
            const id = document.getElementById('editId').value;
            const name = document.getElementById('editName').value;
            const phone = document.getElementById('editPhone').value;

            fetch(`http://127.0.0.1:5000/update_contact/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone })
            })
            .then(res => res.json())
            .then(data => {
                alert(data.message);
                closeEditModal();
                loadContacts(); // 刷新列表
            })
            .catch(err => {
                alert('修改失败：' + err);
            });
        }
