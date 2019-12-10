namespace Orchestrator
{
    public static class Constants
    {
        public static string AuthorizationCookieKey => "Auth";
        public static string HttpContextServiceUserItemKey => "ServiceUser";
        public enum QueueStatus
        {
            Standby = 1,
            Executing = 2,
            Success = 3,
            Error = 4
        }
        public static string QueueEmpty => "No booking available.";
        public static string UnAuthorizedExecutor => "No authorized Executor.";
        public static string PeekUpQueueFailed => "Peek up booking failed.";
    }
}
