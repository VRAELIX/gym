import express, { type Request, type Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateBookingForm, type BookingFormValues } from './src/utils/booking.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface StoredBooking extends BookingFormValues {
  referenceId: string;
  submittedAt: string;
}

const bookingsStore: StoredBooking[] = [];

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json());

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true, bookingsCount: bookingsStore.length });
  });

  app.post('/api/bookings', (req: Request, res: Response) => {
    const body = (req.body ?? {}) as Partial<BookingFormValues>;
    const payload: BookingFormValues = {
      fullName: typeof body.fullName === 'string' ? body.fullName.trim() : '',
      email: typeof body.email === 'string' ? body.email.trim() : '',
      phone: typeof body.phone === 'string' ? body.phone.trim() : '',
      program: typeof body.program === 'string' ? body.program.trim() : '',
      preferredDate: typeof body.preferredDate === 'string' ? body.preferredDate.trim() : '',
      preferredTime: typeof body.preferredTime === 'string' ? body.preferredTime.trim() : '',
      message: typeof body.message === 'string' ? body.message.trim() : '',
      consent: Boolean(body.consent),
    };

    const validation = validateBookingForm(payload);
    if (!validation.valid) {
      res.status(400).json({
        ok: false,
        message: 'Please review the highlighted booking fields.',
        errors: validation.errors,
      });
      return;
    }

    const referenceId = `KP-${new Date().getFullYear()}-${String(1001 + bookingsStore.length)}`;
    const record: StoredBooking = {
      ...payload,
      referenceId,
      submittedAt: new Date().toISOString(),
    };
    bookingsStore.push(record);

    res.status(201).json({
      ok: true,
      referenceId: record.referenceId,
      submittedAt: record.submittedAt,
      booking: {
        fullName: record.fullName,
        email: record.email,
        program: record.program,
        preferredDate: record.preferredDate,
        preferredTime: record.preferredTime,
      },
    });
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      const indexHtml = path.join(distDir, 'index.html');
      if (fs.existsSync(indexHtml)) {
        res.sendFile(indexHtml);
      } else {
        res.status(404).send('Build output not found.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
