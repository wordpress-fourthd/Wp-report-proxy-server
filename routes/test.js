const axios = require('axios');
const headers = {
  'User-Agent': 'Mozilla/5.0 (FD-Maintenance)',
  'Accept': 'application/json'
};

async function testVulnerabilities() {
  try {
    const core = await axios.get('https://api.wpvulnerability.com/core/6.5.4', { headers });
    console.log('✅ Core:', core.data);
  } catch (err) {
    console.error('❌ Core Error:', err.response?.status, err.message);
  }

  try {
    const plugin = await axios.get('https://api.wpvulnerability.com/plugin/elementor', { headers });
    console.log('✅ Plugin:', plugin.data);
  } catch (err) {
    console.error('❌ Plugin Error:', err.response?.status, err.message);
  }

  try {
    const theme = await axios.get('https://api.wpvulnerability.com/theme/astra', { headers });
    console.log('✅ Theme:', theme.data);
  } catch (err) {
    console.error('❌ Theme Error:', err.response?.status, err.message);
  }
}

testVulnerabilities();
