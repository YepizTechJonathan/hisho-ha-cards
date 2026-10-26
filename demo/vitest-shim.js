export const vi = { fn: () => { const f = (...a) => f.impl(...a); f.mockResolvedValue = (v) => { f.impl = async () => v; return f; }; f.impl = async () => ({}); return f; } };
