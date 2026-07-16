-- Revoke EXECUTE from anon/authenticated on SECURITY DEFINER trigger functions.
-- These functions are only invoked by database triggers, not by the API,
-- so PUBLIC/anon/authenticated should not be able to call them directly.

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;