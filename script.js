// ==================== DEMO DATA
// hey im making the changes and after pushing into gitHub ==================== 
const employeesData = [
    { id: 'EMP001', name: 'John Doe', department: 'Engineering', position: 'Senior Developer', email: 'john.doe@corp.com', status: 'present' },
    { id: 'EMP002', name: 'Sarah Johnson', department: 'Engineering', position: 'Full Stack Developer', email: 'sarah.j@corp.com', status: 'present' },
    { id: 'EMP003', name: 'Michael Chen', department: 'Sales', position: 'Sales Manager', email: 'michael.chen@corp.com', status: 'present' },
    { id: 'EMP004', name: 'Emma Williams', department: 'HR', position: 'HR Specialist', email: 'emma.w@corp.com', status: 'absent' },
    { id: 'EMP005', name: 'David Brown', department: 'Operations', position: 'Operations Lead', email: 'david.b@corp.com', status: 'leave' },
    { id: 'EMP006', name: 'Lisa Garcia', department: 'Finance', position: 'Financial Analyst', email: 'lisa.g@corp.com', status: 'present' },
    { id: 'EMP007', name: 'James Wilson', department: 'Engineering', position: 'QA Engineer', email: 'james.w@corp.com', status: 'present' },
    { id: 'EMP008', name: 'Rachel Lee', department: 'Sales', position: 'Sales Executive', email: 'rachel.l@corp.com', status: 'present' },
];

const performanceData = [
    { id: 'EMP001', name: 'John Doe', score: 92, department: 'Engineering', level: 'high' },
    { id: 'EMP002', name: 'Sarah Johnson', score: 88, department: 'Engineering', level: 'high' },
    { id: 'EMP003', name: 'Michael Chen', score: 85, department: 'Sales', level: 'high' },
    { id: 'EMP004', name: 'Emma Williams', score: 78, department: 'HR', level: 'medium' },
    { id: 'EMP005', name: 'David Brown', score: 82, department: 'Operations', level: 'high' },
    { id: 'EMP006', name: 'Lisa Garcia', score: 75, department: 'Finance', level: 'medium' },
    { id: 'EMP007', name: 'James Wilson', score: 81, department: 'Engineering', level: 'high' },
    { id: 'EMP008', name: 'Rachel Lee', score: 70, department: 'Sales', level: 'medium' },
];

const leaveRequestsData = [
    { id: 1, employee: 'Mark Anderson', type: 'Casual', from: '2026-07-10', to: '2026-07-12', days: 3, status: 'pending' },
    { id: 2, employee: 'Susan Martinez', type: 'Earned', from: '2026-08-01', to: '2026-08-08', days: 8, status: 'pending' },
    { id: 3, employee: 'Tom Reynolds', type: 'Sick', from: '2026-07-05', to: '2026-07-05', days: 1, status: 'pending' },
];

// ==================== NAVIGATION ==================== 
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const section = this.getAttribute('data-section');
        switchSection(section);
    });
});

function switchSection(section) {
    // Hide all sections
    document.querySelectorAll('.section-content').forEach(el => {
        el.classList.remove('active');
    });

    // Remove active from nav items
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('active');
    });

    // Show selected section
    const sectionElement = document.getElementById(`${section}-content`);
    if (sectionElement) {
        sectionElement.classList.add('active');
    }

    // Add active to nav item
    document.querySelector(`[data-section="${section}"]`).classList.add('active');

    // Update page title
    const titles = {
        dashboard: 'Dashboard',
        employees: 'Employees',
        performance: 'Performance',
        attendance: 'Attendance',
        leaves: 'Leaves',
        reports: 'Reports'
    };
    document.getElementById('page-title').textContent = titles[section];
}

// ==================== EMPLOYEES TABLE ==================== 
function loadEmployeesTable() {
    const tbody = document.getElementById('employees-tbody');
    tbody.innerHTML = '';

    employeesData.forEach(emp => {
        const statusClass = emp.status === 'present' ? 'present' : emp.status === 'absent' ? 'absent' : 'leave';
        const statusText = emp.status.charAt(0).toUpperCase() + emp.status.slice(1);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${emp.id}</td>
            <td><strong>${emp.name}</strong></td>
            <td>${emp.department}</td>
            <td>${emp.position}</td>
            <td>${emp.email}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td><button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px;">View</button></td>
        `;
        tbody.appendChild(row);
    });
}

// Employee search functionality
document.getElementById('employee-search')?.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#employees-tbody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
    });
});

// ==================== PERFORMANCE GRID ==================== 
function loadPerformanceGrid() {
    const grid = document.getElementById('performance-grid');
    grid.innerHTML = '';

    const filtered = performanceData.filter(emp => {
        const dept = document.getElementById('department-filter')?.value;
        return !dept || emp.department === dept;
    });

    filtered.forEach(emp => {
        const card = document.createElement('div');
        card.className = `performance-card ${emp.level}`;
        card.innerHTML = `
            <div class="performance-name">${emp.name}</div>
            <div class="performance-score">${emp.score}%</div>
            <div class="performance-bar">
                <div class="performance-fill" style="width: ${emp.score}%"></div>
            </div>
            <div class="performance-detail">${emp.department} • ${emp.level === 'high' ? 'Excellent' : emp.level === 'medium' ? 'Good' : 'Fair'} Performance</div>
        `;
        grid.appendChild(card);
    });
}

document.getElementById('department-filter')?.addEventListener('change', loadPerformanceGrid);

// ==================== LEAVE REQUESTS ==================== 
function loadLeaveRequests() {
    const list = document.getElementById('leave-requests-list');
    if (!list) return;

    list.innerHTML = '';
    leaveRequestsData.forEach(req => {
        const item = document.createElement('div');
        item.className = 'request-item';
        item.innerHTML = `
            <div class="request-info">
                <h5>${req.employee}</h5>
                <p>${req.type} Leave • ${req.days} days (${req.from} to ${req.to})</p>
            </div>
            <div class="request-actions">
                <button class="btn-approve" onclick="approveLeave(${req.id})">Approve</button>
                <button class="btn-reject" onclick="rejectLeave(${req.id})">Reject</button>
            </div>
        `;
        list.appendChild(item);
    });
}

function approveLeave(id) {
    alert(`Leave request #${id} approved!`);
    leaveRequestsData = leaveRequestsData.filter(r => r.id !== id);
    loadLeaveRequests();
}

function rejectLeave(id) {
    alert(`Leave request #${id} rejected!`);
    leaveRequestsData = leaveRequestsData.filter(r => r.id !== id);
    loadLeaveRequests();
}

// ==================== CHARTS (USING CANVAS) ==================== 
function initCharts() {
    // Department Distribution Chart
    const deptCtx = document.getElementById('departmentChart');
    if (deptCtx) {
        drawPieChart(deptCtx, [320, 280, 85, 210, 140], ['Engineering', 'Sales', 'HR', 'Operations', 'Finance'], ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6']);
    }

    // Monthly Attendance Chart
    const attendanceCtx = document.getElementById('attendanceChart');
    if (attendanceCtx) {
        drawLineChart(attendanceCtx, ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], [88, 85, 90, 92, 89, 90], '#3498db');
    }

    // Attendance by Department Chart
    const deptAttendanceCtx = document.getElementById('attendanceByDeptChart');
    if (deptAttendanceCtx) {
        drawBarChart(deptAttendanceCtx, ['Engineering', 'Sales', 'HR', 'Operations', 'Finance'], [92, 85, 88, 90, 87]);
    }
}

function drawPieChart(canvas, data, labels, colors) {
    const ctx = canvas.getContext('2d');
    const total = data.reduce((a, b) => a + b, 0);
    let currentAngle = -Math.PI / 2;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;

    data.forEach((value, index) => {
        const sliceAngle = (value / total) * 2 * Math.PI;

        // Draw slice
        ctx.fillStyle = colors[index];
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();

        // Draw border
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        currentAngle += sliceAngle;
    });
}

function drawLineChart(canvas, labels, data, color) {
    const ctx = canvas.getContext('2d');
    const padding = 40;
    const width = canvas.width - 2 * padding;
    const height = canvas.height - 2 * padding;
    const pointSpacing = width / (labels.length - 1);
    const maxValue = 100;
    const scaleY = height / maxValue;

    // Draw axes
    ctx.strokeStyle = '#bdc3c7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Draw gridlines and labels
    ctx.strokeStyle = '#ecf0f1';
    ctx.fillStyle = '#7f8c8d';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';

    for (let i = 0; i < labels.length; i++) {
        const x = padding + i * pointSpacing;
        ctx.fillText(labels[i], x, canvas.height - padding + 20);
    }

    // Draw line
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();

    data.forEach((value, index) => {
        const x = padding + index * pointSpacing;
        const y = canvas.height - padding - (value * scaleY);

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    // Draw points
    ctx.fillStyle = color;
    data.forEach((value, index) => {
        const x = padding + index * pointSpacing;
        const y = canvas.height - padding - (value * scaleY);

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
    });
}

function drawBarChart(canvas, labels, data) {
    const ctx = canvas.getContext('2d');
    const padding = 40;
    const width = canvas.width - 2 * padding;
    const height = canvas.height - 2 * padding;
    const barWidth = width / labels.length * 0.8;
    const barSpacing = width / labels.length;
    const maxValue = 100;
    const scaleY = height / maxValue;

    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];

    // Draw axes
    ctx.strokeStyle = '#bdc3c7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Draw bars and labels
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';

    labels.forEach((label, index) => {
        const barHeight = data[index] * scaleY;
        const x = padding + index * barSpacing + (barSpacing - barWidth) / 2;
        const y = canvas.height - padding - barHeight;

        // Draw bar
        ctx.fillStyle = colors[index];
        ctx.fillRect(x, y, barWidth, barHeight);

        // Draw value on bar
        ctx.fillStyle = '#fff';
        ctx.fillText(data[index] + '%', x + barWidth / 2, y + 20);

        // Draw label
        ctx.fillStyle = '#2c3e50';
        ctx.fillText(label, x + barWidth / 2, canvas.height - padding + 20);
    });
}

// ==================== INITIALIZATION ==================== 
document.addEventListener('DOMContentLoaded', function() {
    // Load initial data
    loadEmployeesTable();
    loadPerformanceGrid();
    loadLeaveRequests();
    initCharts();

    // Add notification bell animation
    document.querySelector('.notify-btn')?.addEventListener('click', function() {
        alert('You have 5 new notifications!');
    });

    // Add button functionality
    document.querySelector('.btn-primary')?.addEventListener('click', function() {
        alert('Add Employee form would open here');
    });

    document.querySelectorAll('.btn-secondary').forEach(btn => {
        if (!btn.getAttribute('onclick')) {
            btn.addEventListener('click', function() {
                alert('Action triggered');
            });
        }
    });
});

// Resize canvas on window resize
window.addEventListener('resize', function() {
    const canvases = document.querySelectorAll('canvas');
    canvases.forEach(canvas => {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    });
    initCharts();
});

// Initialize canvas sizes
document.addEventListener('DOMContentLoaded', function() {
    const canvases = document.querySelectorAll('canvas');
    canvases.forEach(canvas => {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    });
});