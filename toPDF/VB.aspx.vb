Imports System.Data
Imports iTextSharp.text
Imports System.IO
Imports iTextSharp.text.html.simpleparser
Imports iTextSharp.text.pdf

Partial Class VB
    Inherits System.Web.UI.Page
    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        If Not IsPostBack Then
            'Populate DataTable
            Dim dt As New DataTable()
            dt.Columns.Add("Name")
            dt.Columns.Add("Age")
            dt.Columns.Add("City")
            dt.Columns.Add("Country")
            dt.Rows.Add()
            dt.Rows(0)("Name") = "Mudassar Khan"
            dt.Rows(0)("Age") = "27"
            dt.Rows(0)("City") = "Mumbai"
            dt.Rows(0)("Country") = "India"

            'Bind Datatable to Labels
            lblName.Text = dt.Rows(0)("Name").ToString()
            lblAge.Text = dt.Rows(0)("Age").ToString()
            lblCity.Text = dt.Rows(0)("City").ToString()
            lblCountry.Text = dt.Rows(0)("Country").ToString()
        End If
    End Sub
    Protected Sub btnExport_Click(sender As Object, e As EventArgs)
        Response.ContentType = "application/pdf"
        Response.AddHeader("content-disposition", "attachment;filename=Panel.pdf")
        Response.Cache.SetCacheability(HttpCacheability.NoCache)
        Dim sw As New StringWriter()
        Dim hw As New HtmlTextWriter(sw)
        pnlPerson.RenderControl(hw)
        Dim sr As New StringReader(sw.ToString())
        Dim pdfDoc As New Document(PageSize.A4, 10.0F, 10.0F, 100.0F, 0.0F)
        Dim htmlparser As New HTMLWorker(pdfDoc)
        PdfWriter.GetInstance(pdfDoc, Response.OutputStream)
        pdfDoc.Open()
        htmlparser.Parse(sr)
        pdfDoc.Close()
        Response.Write(pdfDoc)
        Response.[End]()

    End Sub

End Class
