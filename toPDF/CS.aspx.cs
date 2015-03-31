using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using iTextSharp.text;
using System.IO;
using iTextSharp.text.html.simpleparser;
using iTextSharp.text.pdf;

public partial class CS : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            string url = HttpContext.Current.Request.Url.PathAndQuery;

            ///CS.aspx?cve=


            string[] split;

            split = url.Split('=');

            if (split.Length > 1)
            {
                string clave = split[1];

                string[] array;
                array = clave.Split('-');

                string primer = array[0];
                string segundo = array[1];

                // Chi%20-%201458
                primer = primer.Replace(@"%20", " ");
                segundo = segundo.Replace(@"%20", "");

                // Chi - 1458
                string CVPROYECTO = primer + "- " + segundo;

                ReportePDF exporta = new ReportePDF();

                exporta.pdfDatosGralProyecto(CVPROYECTO);

                try
                {
                    Response.Redirect("~/ficha_" + CVPROYECTO + ".pdf");

                    //Response.Redirect(cadena);

                    //System.Diagnostics.Process.Start(cadena);
                    //this.Dispose();
                }
                catch (Exception er)
                {
                    //MessageBox.Show("" + er, "Error PDF", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    throw;
                }

            }
        }
    }

}