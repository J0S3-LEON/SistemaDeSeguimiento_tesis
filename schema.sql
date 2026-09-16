CREATE TABLE IF NOT EXISTS institutions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  phone VARCHAR(50),
  status VARCHAR(50),
  contact VARCHAR(255),
  priority VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS follow_ups (
  id SERIAL PRIMARY KEY,
  institution_id INTEGER REFERENCES institutions(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  date DATE,
  notes TEXT,
  status VARCHAR(50) NOT NULL
);
