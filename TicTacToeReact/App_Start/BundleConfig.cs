using System.Web.Optimization;

namespace TicTacToeReact
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/js").Include(
                "~/Scripts/jquery/jquery-{version}.js",
                "~/Scripts/react/react-polyfill.js",
                "~/Scripts/react/react.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                   "~/Content/site.css"));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = true;
        }
    }
}