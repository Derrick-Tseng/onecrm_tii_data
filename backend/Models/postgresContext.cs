using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using backend;

namespace backend.Models
{
    public partial class postgresContext : DbContext
    {
        public postgresContext()
        {
        }

        public postgresContext(DbContextOptions<postgresContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Datum> Data { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseNpgsql("Server=127.0.0.1;Port=5432;Database=postgres;User Id=root;Password=postgres;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Datum>(entity =>
            {
                entity.HasKey(e => e.Productnum)
                    .HasName("data_pkey");

                entity.ToTable("data");

                entity.Property(e => e.Productnum)
                    .HasMaxLength(30)
                    .HasColumnName("productnum");

                entity.Property(e => e.Approvaldate)
                    .HasMaxLength(20)
                    .HasColumnName("approvaldate");

                entity.Property(e => e.Approvalnum)
                    .HasMaxLength(80)
                    .HasColumnName("approvalnum");

                entity.Property(e => e.Company)
                    .HasMaxLength(50)
                    .HasColumnName("company");

                entity.Property(e => e.Enddate)
                    .HasMaxLength(20)
                    .HasColumnName("enddate");

                entity.Property(e => e.Productcontent).HasColumnName("productcontent");

                entity.Property(e => e.Productname)
                    .HasMaxLength(50)
                    .HasColumnName("productname");

                entity.Property(e => e.Rate).HasColumnName("rate");

                entity.Property(e => e.Startdate)
                    .HasMaxLength(20)
                    .HasColumnName("startdate");

                entity.Property(e => e.Status)
                    .HasMaxLength(10)
                    .HasColumnName("status");

                entity.Property(e => e.Treaty).HasColumnName("treaty");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
