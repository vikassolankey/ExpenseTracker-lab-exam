document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('expense-form');
    const list = document.getElementById('expenses-list');
  
    const fetchExpenses = async () => {
      const res = await fetch('/api/expenses');
      const data = await res.json();
      renderExpenses(data);
    };
  
    const renderExpenses = (expenses) => {
      list.innerHTML = '';
      expenses.forEach(exp => {
        const div = document.createElement('div');
        div.innerHTML = `
          <p><strong>${exp.title}</strong> - $${exp.amount} (${exp.category}, ${new Date(exp.date).toLocaleDateString()}) - ${exp.paymentMethod}</p>
          <button onclick="deleteExpense('${exp.id}')">Delete</button>
          <button onclick="editExpense('${exp.id}', '${exp.title}', ${exp.amount}, '${exp.category}', '${exp.date}', '${exp.paymentMethod}')">Edit</button>
        `;
        list.appendChild(div);
      });
    };
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      form.reset();
      fetchExpenses();
    });
  
    window.deleteExpense = async (id) => {
      await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
      fetchExpenses();
    };
  
    window.editExpense = (id, title, amount, category, date, paymentMethod) => {
      form.title.value = title;
      form.amount.value = amount;
      form.category.value = category;
      form.date.value = date.split('T')[0];
      form.paymentMethod.value = paymentMethod;
  
      form.onsubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form));
        await fetch(`/api/expenses/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        form.reset();
        fetchExpenses();
        form.onsubmit = defaultSubmit;
      };
    };
  
    const defaultSubmit = form.onsubmit;
  
    fetchExpenses();
  });
  