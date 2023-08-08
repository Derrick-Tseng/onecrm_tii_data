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
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql();
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
                    .HasMaxLength(15)
                    .HasColumnName("approvaldate");

                entity.Property(e => e.Approvalnum)
                    .HasMaxLength(30)
                    .HasColumnName("approvalnum");

                entity.Property(e => e.Company)
                    .HasMaxLength(30)
                    .HasColumnName("company");

                entity.Property(e => e.Enddate)
                    .HasMaxLength(15)
                    .HasColumnName("enddate");

                entity.Property(e => e.Productcontent).HasColumnName("productcontent");

                entity.Property(e => e.Productname)
                    .HasMaxLength(30)
                    .HasColumnName("productname");

                entity.Property(e => e.Rate).HasColumnName("rate");

                entity.Property(e => e.Startdate)
                    .HasMaxLength(15)
                    .HasColumnName("startdate");

                entity.Property(e => e.Treaty).HasColumnName("treaty");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
