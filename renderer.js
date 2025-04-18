async function scrape() {
  const url = document.getElementById('url').value;
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '采集中...';

  try {
    const data = await window.api.scrape1688(url);
    if (data.error) {
      resultDiv.innerHTML = `<p style="color:red;">${data.error}</p>`;
    } else {
      resultDiv.innerHTML = `
        <h2>${data.title}</h2>
        <p>价格：${data.price}</p>
        <img src="${data.img}" />
      `;
    }
  } catch (e) {
    resultDiv.innerHTML = `<p style="color:red;">失败: ${e.message}</p>`;
  }
}
