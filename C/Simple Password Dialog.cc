int main (int argc, char const* argv[])
{
	fprintf(stderr, "Enter Password:\n");
	char buf[1024];
	fgets(buf, sizeof(buf), stdin);
	return 0;	
}