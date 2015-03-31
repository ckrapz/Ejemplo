<%@ Page Language="VB" AutoEventWireup="false" CodeFile="VB.aspx.vb" Inherits="VB" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
 <asp:Panel ID="pnlPerson" runat="server">
    <table border="1" style="font-family: Arial; font-size: 10pt; width: 200px">
        <tr>
            <td colspan="2" style="background-color: #18B5F0; height: 18px; color: White; border: 1px solid white">
                <b>Personal Details</b>
            </td>
        </tr>
        <tr>
            <td><b>Name:</b></td>
            <td><asp:Label ID="lblName" runat="server"></asp:Label></td>
        </tr>
        <tr>
            <td><b>Age:</b></td>
            <td><asp:Label ID="lblAge" runat="server"></asp:Label></td>
        </tr>
        <tr>
            <td><b>City:</b></td>
            <td><asp:Label ID="lblCity" runat="server"></asp:Label></td>
        </tr>
        <tr>
            <td><b>Country:</b></td>
            <td><asp:Label ID="lblCountry" runat="server"></asp:Label></td>
        </tr>
    </table>
</asp:Panel>
<asp:Button ID="btnExport" runat="server" Text="Export" OnClick="btnExport_Click" />

    </form>
</body>
</html>
