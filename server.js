const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/tesis_seg';

app.use(cors());
app.use(express.json());

const client = new Client({ connectionString });

const defaultInstitutions = [
  {
    id: 1,
    name: 'Lobachevsky',
    address: 'Av. 26 de Enero 248, Ayacucho',
    phone: '',
    status: 'Pendiente',
    contact: '',
    priority: 'Media',
    followUps: [
      { id: 1, date: '', notes: '', status: 'Pendiente' },
      { id: 2, date: '', notes: '', status: 'Pendiente' },
      { id: 3, date: '', notes: '', status: 'Pendiente' }
    ]
  },
  {
    id: 2,
    name: 'San Juan Bosco',
    address: 'Jr. Cuzco 153, Ayacucho',
    phone: '',
    status: 'Pendiente',
    contact: '',
    priority: 'Media',
    followUps: [
      { id: 1, date: '', notes: '', status: 'Pendiente' },
      { id: 2, date: '', notes: '', status: 'Pendiente' },
      { id: 3, date: '', notes: '', status: 'Pendiente' }
    ]
  },
  {
    id: 3,
    name: 'El Buen Pastor',
    address: 'Jr. Grau 824, Ayacucho',
    phone: '',
    status: 'Pendiente',
    contact: '',
    priority: 'Media',
    followUps: [
      { id: 1, date: '', notes: '', status: 'Pendiente' },
      { id: 2, date: '', notes: '', status: 'Pendiente' },
      { id: 3, date: '', notes: '', status: 'Pendiente' }
    ]
  },
  {
    id: 4,
    name: 'Pascual Saco Oliveros',
    address: 'Jr. Garcilazo de la Vega 777-785, Ayacucho',
    phone: '',
    status: 'Pendiente',
    contact: 'Justiniano Jaico Coras',
    priority: 'Media',
    followUps: [
      { id: 1, date: '', notes: '', status: 'Pendiente' },
      { id: 2, date: '', notes: '', status: 'Pendiente' },
      { id: 3, date: '', notes: '', status: 'Pendiente' }
    ]
  },
  {
    id: 5,
    name: 'San Agustín',
    address: 'Jr. 9 de Diciembre 362, Ayacucho',
    phone: '',
    status: 'Pendiente',
    contact: 'Victor De La Cruz Eyzaguirre',
    priority: 'Alta',
    followUps: [
      { id: 1, date: '', notes: '', status: 'Pendiente' },
      { id: 2, date: '', notes: '', status: 'Pendiente' },
      { id: 3, date: '', notes: '', status: 'Pendiente' }
    ]
  },
  {
    id: 6,
    name: 'Leonardo Da Vinci',
    address: 'Jr. Callao 264, Ayacucho',
    phone: '',
    status: 'Pendiente',
    contact: 'Eduardo Franco Ramirez Quijada',
    priority: 'Media',
    followUps: [
      { id: 1, date: '', notes: '', status: 'Pendiente' },
      { id: 2, date: '', notes: '', status: 'Pendiente' },
      { id: 3, date: '', notes: '', status: 'Pendiente' }
    ]
  },
  {
    id: 7,
    name: 'Cesar Abraham Vallejo',
    address: 'Jr. Pizarro 370, Ayacucho',
    phone: '',
    status: 'Pendiente',
    contact: 'Alejandro Aybar Meza',
    priority: 'Media',
    followUps: [
      { id: 1, date: '', notes: '', status: 'Pendiente' },
      { id: 2, date: '', notes: '', status: 'Pendiente' },
      { id: 3, date: '', notes: '', status: 'Pendiente' }
    ]
  },
  {
    id: 8,
    name: 'Jean Piaget',
    address: 'Av. Mariscal Caceres 1030, Ayacucho',
    phone: '',
    status: 'Pendiente',
    contact: 'Liliana Palomino Landeo',
    priority: 'Alta',
    followUps: [
      { id: 1, date: '', notes: '', status: 'Pendiente' },
      { id: 2, date: '', notes: '', status: 'Pendiente' },
      { id: 3, date: '', notes: '', status: 'Pendiente' }
    ]
  },
  {
    id: 9,
    name: 'María Auxiliadora',
    address: 'Jr. Callao 250, Ayacucho',
    phone: '',
    status: 'Pendiente',
    contact: '',
    priority: 'Media',
    followUps: [
      { id: 1, date: '', notes: '', status: 'Pendiente' },
      { id: 2, date: '', notes: '', status: 'Pendiente' },
      { id: 3, date: '', notes: '', status: 'Pendiente' }
    ]
  },
  {
    id: 10,
    name: 'Center',
    address: 'Jr. Garcilaso de la Vega 461, Ayacucho',
    phone: '',
    status: 'Pendiente',
    contact: 'Luis Villa Perez',
    priority: 'Media',
    followUps: [
      { id: 1, date: '', notes: '', status: 'Pendiente' },
      { id: 2, date: '', notes: '', status: 'Pendiente' },
      { id: 3, date: '', notes: '', status: 'Pendiente' }
    ]
  },
  {
    id: 11,
    name: 'Nazareno',
    address: 'Jr. Garcilazo de la Vega 277, Ayacucho',
    phone: '',
    status: 'Pendiente',
    contact: 'Oswaldo Avelino Guerra Hernandez',
    priority: 'Media',
    followUps: [
      { id: 1, date: '', notes: '', status: 'Pendiente' },
      { id: 2, date: '', notes: '', status: 'Pendiente' },
      { id: 3, date: '', notes: '', status: 'Pendiente' }
    ]
  }
];

async function initializeDatabase() {
  try {
    await client.connect();

    await client.query(`
      CREATE TABLE IF NOT EXISTS institutions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255),
        phone VARCHAR(50),
        status VARCHAR(50),
        contact VARCHAR(255),
        priority VARCHAR(50)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS follow_ups (
        id SERIAL PRIMARY KEY,
        institution_id INTEGER REFERENCES institutions(id) ON DELETE CASCADE,
        position INTEGER NOT NULL,
        date DATE,
        notes TEXT,
        status VARCHAR(50) NOT NULL
      );
    `);

    const countResult = await client.query('SELECT COUNT(*)::int AS total FROM institutions;');

    if (countResult.rows[0].total === 0) {
      for (const inst of defaultInstitutions) {
        const institutionResult = await client.query(
          `INSERT INTO institutions (name, address, phone, status, contact, priority)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING id;`,
          [inst.name, inst.address, inst.phone, inst.status, inst.contact, inst.priority]
        );

        const institutionId = institutionResult.rows[0].id;

        for (let i = 0; i < inst.followUps.length; i += 1) {
          const followUp = inst.followUps[i];
          await client.query(
            `INSERT INTO follow_ups (institution_id, position, date, notes, status)
             VALUES ($1, $2, $3, $4, $5);`,
            [institutionId, i + 1, followUp.date || null, followUp.notes || '', followUp.status]
          );
        }
      }
    }

    console.log('Base de datos lista.');
  } catch (error) {
    console.error('No se pudo conectar a PostgreSQL:', error.message);
    console.log('La API puede iniciar, pero las operaciones de BD quedarán deshabilitadas hasta que PostgreSQL esté disponible.');
  }
}

function normalizeFollowUps(rawFollowUps = []) {
  const fallback = [
    { id: 1, date: '', notes: '', status: 'Pendiente' },
    { id: 2, date: '', notes: '', status: 'Pendiente' },
    { id: 3, date: '', notes: '', status: 'Pendiente' }
  ];

  if (!Array.isArray(rawFollowUps) || rawFollowUps.length === 0) return fallback;

  return rawFollowUps.map((item, index) => ({
    id: item.id || index + 1,
    date: item.date || '',
    notes: item.notes || '',
    status: item.status || 'Pendiente'
  })).slice(0, 3);
}

async function getInstitutions() {
  if (!client._connected) {
    return defaultInstitutions;
  }

  try {
    const result = await client.query(`
      SELECT i.id, i.name, i.address, i.phone, i.status, i.contact, i.priority,
             json_agg(
               json_build_object(
                 'id', f.id,
                 'date', f.date,
                 'notes', f.notes,
                 'status', f.status
               )
               ORDER BY f.position
             ) AS follow_ups
      FROM institutions i
      LEFT JOIN follow_ups f ON f.institution_id = i.id
      GROUP BY i.id, i.name, i.address, i.phone, i.status, i.contact, i.priority
      ORDER BY i.id ASC;
    `);

    return result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      address: row.address,
      phone: row.phone,
      status: row.status,
      contact: row.contact,
      priority: row.priority,
      followUps: normalizeFollowUps(row.follow_ups)
    }));
  } catch (error) {
    console.error('Error al consultar instituciones:', error.message);
    return defaultInstitutions;
  }
}

async function updateInstitution(id, institutionData) {
  if (!client._connected) {
    return { ok: false, message: 'PostgreSQL no está disponible.' };
  }

  try {
    const fields = [
      institutionData.name,
      institutionData.address,
      institutionData.phone || '',
      institutionData.status,
      institutionData.contact || '',
      institutionData.priority,
      id
    ];

    await client.query(
      `UPDATE institutions
       SET name = $1,
           address = $2,
           phone = $3,
           status = $4,
           contact = $5,
           priority = $6
       WHERE id = $7;`,
      fields
    );

    await client.query('DELETE FROM follow_ups WHERE institution_id = $1;', [id]);

    for (let i = 0; i < (institutionData.followUps || []).length; i += 1) {
      const followUp = institutionData.followUps[i];
      await client.query(
        `INSERT INTO follow_ups (institution_id, position, date, notes, status)
         VALUES ($1, $2, $3, $4, $5);`,
        [id, i + 1, followUp.date || null, followUp.notes || '', followUp.status || 'Pendiente']
      );
    }

    return { ok: true };
  } catch (error) {
    console.error('Error al actualizar institución:', error.message);
    return { ok: false, message: error.message };
  }
}

app.get('/api/health', (_, res) => {
  res.json({ ok: true, message: 'Backend operativo', database: client._connected ? 'postgresql' : 'offline' });
});

app.get('/api/institutions', async (_, res) => {
  const institutions = await getInstitutions();
  res.json(institutions);
});

app.put('/api/institutions/:id', async (req, res) => {
  const { id } = req.params;
  const result = await updateInstitution(Number(id), req.body);

  if (!result.ok) {
    return res.status(500).json({ ok: false, message: result.message || 'No se pudo guardar la institución.' });
  }

  const updated = await getInstitutions();
  const selected = updated.find((item) => item.id === Number(id));
  return res.json({ ok: true, data: selected });
});

app.listen(port, async () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  await initializeDatabase();
  console.log('Listo para recibir peticiones.');
});

process.on('SIGINT', async () => {
  try {
    await client.end();
  } catch (error) {
    console.log('Cierre limpio del cliente PostgreSQL.');
  }
  process.exit(0);
});
