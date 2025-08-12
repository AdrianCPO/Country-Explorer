export const validateQuery = (q) => {
  const value = (q ?? "").trim();
  if (value.length === 0) return { ok: true, value: "" };
  if (value.length < 2) return { ok: false, error: "Minst 2 tecken." };
  if (value.length > 40) return { ok: false, error: "Max 40 tecken." };
  if (!/^[\p{L}\s-]+$/u.test(value))
    return {
      ok: false,
      error: "Endast bokstäver, mellanslag och bindestreck.",
    };
  return { ok: true, value };
};
