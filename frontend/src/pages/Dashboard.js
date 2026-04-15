import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import taskService from '../services/taskService';
import authService from '../services/authService';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', priority: 'medium', status: 'pending' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const user = authService.getCurrentUser();

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await taskService.getTasks();
      setTasks(res.data);
    } catch (err) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading(editingId ? 'Updating task...' : 'Creating task...');
    try {
      if (editingId) {
        await taskService.updateTask(editingId, formData);
        toast.success('Task updated successfully!', { id: loadingToast });
        setEditingId(null);
      } else {
        await taskService.createTask(formData);
        toast.success('Task created successfully!', { id: loadingToast });
      }
      setFormData({ title: '', description: '', priority: 'medium', status: 'pending' });
      fetchTasks();
    } catch (err) {
      toast.error('Operation failed', { id: loadingToast });
    }
  };

  const onEdit = (task) => {
    setEditingId(task._id);
    setFormData({ 
      title: task.title, 
      description: task.description, 
      priority: task.priority || 'medium',
      status: task.status || 'pending'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onDelete = async (id) => {
    if (window.confirm('Are you sure? Only admins can delete tasks.')) {
      try {
        await taskService.deleteTask(id);
        toast.success('Task deleted!');
        fetchTasks();
      } catch (err) {
        toast.error(err.response?.data?.message || 'Delete failed');
      }
    }
  };

  const toggleStatus = async (task) => {
    try {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      await taskService.updateTask(task._id, { status: newStatus });
      toast.success(`Task marked as ${newStatus}`);
      fetchTasks();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const getPriorityColor = (p) => {
    switch (p) {
      case 'high': return '#ff4d4f';
      case 'medium': return '#faad14';
      case 'low': return '#52c41a';
      default: return '#8c8c8c';
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ margin: 0, color: '#1890ff' }}>Tasks</h1>
          <p style={{ color: '#666' }}>Welcome back, <strong>{user?.name}</strong></p>
        </div>
      </header>
      
      <section style={{ backgroundColor: '#f9f9f9', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
        <h3 style={{ marginTop: 0 }}>{editingId ? '📝 Edit Task' : '➕ Create New Task'}</h3>
        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              name="title"
              placeholder="What needs to be done?"
              value={formData.title}
              onChange={onChange}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <textarea
              name="description"
              placeholder="Add more details..."
              value={formData.description}
              onChange={onChange}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', minHeight: '80px' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '5px' }}>Priority</label>
              <select name="priority" value={formData.priority} onChange={onChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '5px' }}>Status</label>
              <select name="status" value={formData.status} onChange={onChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <button type="submit" style={{ padding: '12px 24px', backgroundColor: '#1890ff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            {editingId ? 'Update Task' : 'Add Task'}
          </button>
          {editingId && (
            <button 
              type="button" 
              onClick={() => { setEditingId(null); setFormData({ title: '', description: '', priority: 'medium', status: 'pending' }); }}
              style={{ marginLeft: '10px', padding: '12px 24px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}
            >
              Cancel
            </button>
          )}
        </form>
      </section>

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3>Your Tasks</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['all', 'pending', 'completed'].map(s => (
              <button 
                key={s} 
                onClick={() => setFilter(s)}
                style={{ 
                  padding: '6px 12px', 
                  borderRadius: '20px', 
                  border: filter === s ? '1px solid #1890ff' : '1px solid #ddd',
                  backgroundColor: filter === s ? '#e6f7ff' : 'white',
                  color: filter === s ? '#1890ff' : '#666',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        
        {loading ? (
          <p style={{ textAlign: 'center', color: '#888' }}>Loading tasks...</p>
        ) : filteredTasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fafafa', borderRadius: '12px' }}>
            <p style={{ color: '#888' }}>No tasks found for this filter.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '15px' }}>
            {filteredTasks.map((task) => (
              <div key={task._id} style={{ 
                padding: '20px', 
                borderRadius: '12px', 
                border: '1px solid #eee', 
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input 
                      type="checkbox" 
                      checked={task.status === 'completed'} 
                      onChange={() => toggleStatus(task)}
                      style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <h4 style={{ margin: 0, textDecoration: task.status === 'completed' ? 'line-through' : 'none', color: task.status === 'completed' ? '#888' : '#333' }}>
                      {task.title}
                    </h4>
                  </div>
                  <span style={{ 
                    fontSize: '11px', 
                    padding: '3px 8px', 
                    borderRadius: '4px', 
                    backgroundColor: getPriorityColor(task.priority),
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}>
                    {task.priority}
                  </span>
                </div>
                <p style={{ margin: '0 0 15px 28px', color: '#666', fontSize: '14px' }}>{task.description}</p>
                <div style={{ marginLeft: '28px', display: 'flex', gap: '15px' }}>
                  <button onClick={() => onEdit(task)} style={{ border: 'none', background: 'none', color: '#1890ff', cursor: 'pointer', fontSize: '13px', padding: 0 }}>Edit</button>
                  {user?.role === 'admin' && (
                    <button onClick={() => onDelete(task._id)} style={{ border: 'none', background: 'none', color: '#ff4d4f', cursor: 'pointer', fontSize: '13px', padding: 0 }}>Delete</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
