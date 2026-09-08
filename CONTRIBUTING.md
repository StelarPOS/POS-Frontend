# Contributing to StellarPOS Frontend

Thank you for your interest in contributing to the **StellarPOS Frontend**! We welcome all contributions, including bug reports, feature requests, documentation improvements, and code changes.

---

## Code of Conduct

Please be respectful, constructive, and collaborative in all communications.

---

## Development Workflow

1. **Fork & Clone**
   ```bash
   git clone https://github.com/<your-username>/POS-Frontend.git
   cd POS-Frontend
   ```

2. **Branching Strategy**
   * Use descriptive branch names: `feature/payment-status-stream`, `fix/qr-code-padding`.

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Development & Testing**
   * Run the local Vite dev server: `npm run dev`
   * Test the production build before submitting: `npm run build`
   * Check for console errors or broken imports.

5. **Commit Conventions**
   Follow Conventional Commits format:
   * `feat: add sound effect on successful payment`
   * `fix: correct asset issuer query parameter`
   * `docs: update quickstart instructions`

6. **Submit a Pull Request**
   * Push your branch to your fork.
   * Open a PR targeting the `main` branch.
   * Fill out the PR template completely.

---

## Guidelines
* Do NOT introduce TypeScript (project uses clean JSX/JavaScript).
* Keep styling aligned with Tailwind CSS and dark modern fintech aesthetics.
* Avoid large external libraries without discussion.
